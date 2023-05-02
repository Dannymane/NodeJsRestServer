const jwt = require("jsonwebtoken");
const db = require("../utils/db");

module.exports = function(req, res, next) {

  if(req.isAuthenticated()){

    var token = jwt.sign({ id: req.user.id }, "DanielKey", {
      expiresIn: 300 // 5 minutes
    });
    res.set('Authorization', 'Bearer ' + token);
    next();
  } else{
    res.redirect("/login");
  }
};




