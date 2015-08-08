var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User');


module.exports = function(){
    "use strict";

    passport.use(new LocalStrategy(
        function(username, password, done){
            "use strict";

            User.findOne({userName: username}).exec(function(err, user){
                if(user && user.authenticate(password)){
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
};