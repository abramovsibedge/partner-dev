var isDevMode = false;
if (process.env.NODE_ENV === 'dev') {isDevMode = false;}

import express from 'express';
import http from 'http';
import path from 'path';
import config from './config';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import {handleRender} from './libs/handleRender';


const log = require('./libs/log')(module);
const HttpError = require('./error').HttpError;

// for templates
require('node-jsx').install();

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(handleRender);


//statick nodejs
app.use(express.static(path.join(__dirname, 'public')));

// setting template
app.set('views', path.join(__dirname, 'template'));
app.set('view engine', 'ejs');

// errors
app.use(require('./middleware/sendHttpError'));


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

