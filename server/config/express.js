var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    stylus = require('stylus'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function(app, config){
    "use strict";

    // Middleware configuration for stylus
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }


// ************* Configuration ***************

// View engine
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');

// Turn on Express' logging
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(session({secret: 'multi vision unicorns', resave: false, saveUninitialized:false}));
    app.use(passport.initialize());
    app.use(passport.session());


// this has been updated from the video
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: compile
        }
    ));

// Express static middleware for static pages ie. static route handling
    app.use(express.static(config.rootPath + '/public'));
};
