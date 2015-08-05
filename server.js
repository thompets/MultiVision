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
mongoose.connect('mongodb://localhost/multivision');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error ...'));
db.once('open', function callback(){
    console.log('multivision db opened');
});
var messageSchema = mongoose.Schema({ message: String });
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc){
    mongoMessage = messageDoc.message;
});

// Add route for partials
app.get('/partials/:partialPath', function(req, res){
    res.render('partials/' + req.params.partialPath);
});

// Add route that delivers index page
// * will match all routes
app.get('*', function(req, res){
    res.render('index', {
        mongoMessage: mongoMessage
    });
});

// Listen to requests
var port = 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');