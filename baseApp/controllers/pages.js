
const jwt = require("jsonwebtoken");
exports.mainPage = function(req, res) {
  res.render('index', {title: 'Base App'} );
}

exports.loginForm = function(req, res) {
  res.render('login');
}

exports.sessionInfo = function(req, res, next) {
  if(req.session.odwiedziny) {
    req.session.odwiedziny++;
  } else {
    req.session.odwiedziny = 1;
  }
  
  // var token = jwt.sign({ id: req.user.id }, "DanielKey", {
  //   expiresIn: 300 // 5 minutes
  // });
  // res.set('Authorization', 'Bearer ' + token);

  var dane = {
    idSesji: req.session.id,
    odwiedziny: req.session.odwiedziny,
    ciasteczko: req.session.cookie,
    data: req.session.cookie.data,
    passport: req.session.passport,
    token: req.headers.authorization
  };
  res.render('sesja', dane);
}

exports.authUserInfo = function(req, res) {
  var dane = {
    user: req.user,
    passport: req.session.passport,
    auth_info: res.locals.authInfo
  };
  res.render('zalogowany', dane);
}

// exports.authUserInfoNotActivated = function(req, res) {
//   var dane = {
//     user: req.user,
//     passport: req.session.passport,
//     auth_info: res.locals.authInfo
//   };
//   res.render('notActivated', dane);
// }
