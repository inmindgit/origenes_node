var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var muestrasRouter = require('./src/routes/muestras');
var resultadosRouter = require('./src/routes/resultados');
var app = express();

app.use(session({
  secret: 'origenes',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './src/public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/muestras', muestrasRouter);
app.use('/resultados', resultadosRouter);

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

// body parser
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;
