var express = require('express');

// Environment variable (dev or prod)
// set development as default
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Express application
var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

// Listen to requests
app.listen(config.port);
console.log('Listening on port ' + config.port + '...');
