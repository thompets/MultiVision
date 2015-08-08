var auth = require('./auth'),
    users = require('../controllers/users'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(app){
    "use strict";

    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);

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