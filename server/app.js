var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usuarisRouter = require('./routes/usuaris');
var authRouter = require('./routes/auth');

var app = express();


/**
 * Handlebars configuration
 */
require('./config/handlebars')(app)

// view engine setup
app.set("views", path.join(__dirname, "views"));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * MongoDB connection
 */
require('./config/database')()

/**
 * Passport configuration
 */
require('./config/passport')(app)

/**
 * Flash messages
 */
require('./config/flash')(app)

app.use('/', indexRouter);
app.use('/usuaris', usuarisRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
