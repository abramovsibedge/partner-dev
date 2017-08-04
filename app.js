var isDevMode = false;
if (process.env.NODE_ENV === 'dev') {
    isDevMode = true;
}

var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');
var session = require('express-session');
var log = require('./libs/log')(module);
var HttpError = require('./error').HttpError;
var i18n = require("i18n");
var fs = require('fs');

//lang
i18n.configure({
    locales:['ru', 'en'],
    cookie: 'lang',
    directory: __dirname + '/locales',
    defaultLocale: 'ru'
});

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18n.init);

app.use(require('./middleware/sendHttpError'));
//statick ndoejs
app.use(express.static(path.join(__dirname, 'public')));

if (isDevMode) {
    // delete the bundle file to avoid conflicting with dist build(gulp build)
    // by default bundle.js is generated in memory
    var bundleFileName = './public/build/bundle.js';
    var bundleMapFile = './public/build/bundle.js.map';
    var exists = fs.existsSync(bundleFileName);
    if (exists) {
        fs.unlinkSync('./public/build/bundle.js');
    }
    exists = fs.existsSync(bundleMapFile);

    if (exists) {
        fs.unlinkSync('./public/build/bundle.js.map');
    }

    var webpack = require('webpack');
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpackConfig = require('./webpack.dev.config');
    var compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, { noInfo: false, publicPath: webpackConfig.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
}

require('./routes')(app);

app.use(function(req, res, next) {
    next(new HttpError(404, "Not found"));
});

app.use(function(err, req, res, next) {
    if(typeof err == 'number') {
        err = new HttpError(err);
    }
    if(err instanceof HttpError) {
        res.sendHttpError(err);
    }
    else {
        if (isDevMode) {
            res.status(err.status || 500);
            console.log(err);
            res.send();
        }
        else {
            log.error(err);
            res.status(err.status || 500);
            res.send();
        }
    }
});

var server = http.createServer(app);

server.listen(config.get('port'), function(){
    log.info('Express server listen on port' + config.get('port'));
});

module.exports = app;

