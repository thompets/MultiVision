var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),

    // How passport implements authentication
    LocalStrategy = require('passport-local').Strategy;

// Environment variable (dev or prod)
// set development as default
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Express application
var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

var User = mongoose.model('User');
passport.use(new LocalStrategy(
    function(username, password, done){
        "use strict";

        User.findOne({userName: username}).exec(function(err, user){
            if(user){
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }
));

passport.serializeUser(function(user, done){
    "use strict";
    if (user){
        done(null, user._id);
    }
});

passport.deserializeUser(function(id, done){
    "use strict";

    User.findOne({_id: id}).exec(function(err, user){
        if(user){
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
});

require('./server/config/routes')(app);

// Listen to requests
app.listen(config.port);
console.log('Listening on port ' + config.port + '...');
