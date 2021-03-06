var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');



// Setup Routes
var index = require('./server/routes/index');
var users = require('./server/routes/users');
var speakers = require('./server/routes/speakers');
// http://localhost:3000/api/speakers



// Database configuration
var config = require('./server/config/config.js');
// connect to our database
mongoose.connect(config.url);

// Check if MongoDB is running
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Setting some path URLs
app.use('/', index);
app.use('/users', users);
app.use('/api/speakers', speakers);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


// setup express server and port to listen on
app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.
    address().port);
});
