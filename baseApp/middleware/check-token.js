const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }
    
    jwt.verify(token.split(' ')[1], "DanielKey", (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
  };
