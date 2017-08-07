
module.exports = function(app) {
    app.get('/', require('./main').get);
    app.get('/test', require('./main').test);
};
