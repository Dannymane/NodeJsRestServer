var session = require('express-session');
var db = require('./db');
var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;

module.exports = function(app) {

  app.use(session({
    secret: 'tajny kod',
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: 20*60*1000 },
    resave: false,
    saveUninitialized: false
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    db.User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      db.User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

};
