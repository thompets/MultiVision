var auth = require('./auth');

module.exports = function(app){
    "use strict";

    // Add route for partials
    app.get('/partials/*', function(req, res){
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function(req, res){
        req.logout();
        res.end();
    });

    // Add route that delivers index page
    // * will match all routes
    app.get('*', function(req, res){
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};