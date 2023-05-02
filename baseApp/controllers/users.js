const passport = require('passport');
const Db = require('../utils/db');
const { SHA3 } = require("sha3");
const hash = new SHA3(256);
const jwt = require('jsonwebtoken');


exports.resetUsers = function(req, res, next) {
  Db.User.deleteMany({}, function (err) {
    if (err) return handleError(err);
    hash.reset();
    var admin = new Db.User({ username:"admin", password:hash.update("stud234").digest('hex'), email:"admin@pcz.pl", activated: true });
    hash.reset();
    var asdf = new Db.User({ username:"asdf", password:hash.update("asdf").digest('hex'), email:"asdf@pcz.pl", activated: true });
    // create two users: 'admin' and 'asdf'
    admin.save( function(err,data) {
      if (err) return console.error(err);
      asdf.save( function(err,data2) {
        if (err) return console.error(err);
        res.render('reset', { data: data, data2: data2} );
      })
    });
  });
}


exports.getUsers = function(req, res) {
  Db.User.find(function (err, data) {
    if (err) return console.error(err);
    console.log(data);
    res.json(data);
  })
}


exports.loginUser = passport.authenticate('local',
  {
    session: true,
    successRedirect: '/',
    failureRedirect: '/login'
        
  }
)


// exports.logoutUser = function(req, res){
//   req.logout();
//   res.redirect('/');
// }
exports.logoutUser = function(req, res){
  req.logout(function(err) {
    if (err) {
      // handle error
      console.error(err);
    }
    res.redirect('/');
  });
}