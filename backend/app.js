var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');

require('./passport').config(passport);
// dotenv 적용 (config()가 호출되면, .env 파일의 설정값들이 process.env에 저장되며, 이후 process.env.COOKIE_SECRET 처럼 설정값들을 사용할 수 있다.)
require('dotenv').config();

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var careCenterRouter = require('./routes/care-center');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//express-session 적용하면서 쿠키 비밀키를 설정해준다.(cookieParser와 express-session은 동일한 쿠키 비밀키를 사용해야 한다.)
app.use(cookieParser(process.env.COOKIE_SECRET)); 
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  }
}));
app.use(passport.initialize()); //req에 passport의 설정값들 적용
app.use(passport.session()); //session 정보 저장 (req.session, req.user)

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/carecenter', careCenterRouter);

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
