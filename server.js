var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// Environment variable (dev or prod)
// set development as default
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Express application
var app = express();

// Middleware configuration for stylus
function compile(str, path) {
    return stylus(str).set('filename', path);
}


// ************* Configuration ***************

// View engine
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

// Turn on Express' logging
app.use(logger('dev'));

app.use(bodyParser.json());

// this has been updated from the video
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

// Express static middleware for static pages ie. static route handling
app.use(express.static(__dirname + '/public'));

// Mongoose Config

// use this when heroku is set up
// mongodb://<dbuser>:<dbpassword>@ds031223.mongolab.com:31223/multivision
if (env === 'development'){
  mongoose.connect('mongodb://localhost/multivision');
} else {
  mongoose.connect('mongodb://pthompson:multivision@ds031223.mongolab.com:31223/multivision');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error ...'));
db.once('open', function callback(){
    console.log('multivision db opened');
});

// Add route for partials
app.get('/partials/*', function(req, res){
    res.render('../../public/app/' + req.params[0]);
});

// Add route that delivers index page
// * will match all routes
app.get('*', function(req, res){
    res.render('index');
});

// Listen to requests
var port = process.env.PORT || 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');
