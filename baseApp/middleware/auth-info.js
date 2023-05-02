
module.exports = function(req, res, next) {
  if(req.isAuthenticated()){
    // if user is looged in, req.isAuthenticated() will return true
    res.locals.authInfo = `Logged in: ${req.user.username}`;
    next();
  } else{
    res.locals.authInfo = `Not logged in`;
    next();
  }
};
