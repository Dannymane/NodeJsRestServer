const cookieParser = require('cookie-parser');
const express = require('express');
const httpErrors = require('http-errors');
const logger = require('morgan');
const path = require('path');

const authInfo = require("./middleware/auth-info");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const animalsRouter = require('./routes/animals');
const SignInUpRouter = require('./routes/sign');

const app = express();

app.set('views', path.join(__dirname, 'views'));
// view engine setup
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// cała obsługa logowania za pomocą Passport w osobnym module (utils/passport)
// https://stackoverflow.com/questions/32418963/how-to-use-multiple-router-files
const passport = require('./utils/passport');
passport(app);

// Dodaje do zmiennej 
app.use(authInfo);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/animals', animalsRouter);
app.use('/sign', SignInUpRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
