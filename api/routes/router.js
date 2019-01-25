module.exports = app => {
    app.use('/forecast', require('./api'))
}