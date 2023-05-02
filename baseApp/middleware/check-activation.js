const db = require("../utils/db");

module.exports = async function(req, res, next) {
    try {
    const user = await db.User.findOne({username: req.user.username});
    if(user){
        if(user.activated == false){
            console.log("User is not activated");
            var data = {
                user: req.user,
              };
            res.render('notActivated', data);
            return;
        } else{
            next();
        }
    }else{
        res.redirect("/login");
    }
} catch (error) {
    console.error(error);
    res.redirect("/login");
}
};