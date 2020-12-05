module.exports = (app) => {
    app.use('/game', require('./game'));
    app.use('/genre', require('./genre'));
    app.use('/platform', require('./platform'));
    app.use('/producer', require('./producer'));
    app.use((err, req, res, next) => {
        res.status(500).send();
    });
};