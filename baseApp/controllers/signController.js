const passport = require('passport');
const Db = require('../utils/db');
const emailConfig = require("../config/emailConfig.js");
const { SHA3 } = require("sha3");
const hash = new SHA3(256);
const jwt = require('jsonwebtoken');

exports.signup_page = (req, res) => {
    message_signup = req.app.get('message_signup');
    req.app.set('message_signup', null)
    return res.render('signUp', { title: 'Sign up', message_signup: message_signup });
};

exports.signup = async (req, res) => {
    if (req.body.username == null ||    
        req.body.username == "" ||
        req.body.password == null ||
        req.body.password == "" ||
        req.body.email == null ||
        req.body.email == "") {
        res.render('signUp', { title: 'Sign up', message_signup: "Fill all fields." });
        return;
    }
    try {
        const existingUser = await Db.User.findOne({ username: req.body.username });

        if (existingUser) {
            res.render("signUp", { title: "Sign up", message_signup: "This username is already registered." });
            return;
        }

        if (existingUser){
            res.render("signUp", { title: "Sign up", message_signup: "This username is already registered." });
            return;
        }

        hash.reset();
        const new_user = new Db.User({
            username: req.body.username,
            password: hash.update(req.body.password).digest('hex'),
            email: req.body.email,
        });

        const user = await new_user.save();

        var activationLink = 'http://localhost:3000/sign/activate/' + user._id;
        var mailOptions = {
            from: `"Daniel Yanko" <danielyanko@t.pl>`,
            to: new_user.email,
            subject: 'Account activation',
            html: `<h3>Good afternoon ${user.username}!</h3>
            <p>Thank you for registration on our servis.</p>
            <p>Please click the activation link below to activate your account.</p>
            <p> Activation link:
            <a href="${activationLink}">${activationLink}</a></p>
            <p>Best regards, Daniel Yanko</p>`
        };

        const info = await emailConfig.transporter.sendMail(mailOptions);
        res.render("index", { message: "The user has been created. Please check your email to activate your account." });
        // return res.redirect("/");

    } catch (err) {

        res.render("signUp", { title: "Sign up", message_signup: err });
    }
};

exports.activate = (req, res) => {
    Db.User.findById(req.params.user_id)
    .exec((err, user) => {
        if (err) {
            res.render('signUp', { title: 'Sign up', message_signup: err });
            return;
        }
        if (user) {
            user.activated = true;
            user.save((err, user) => {
                if (err) {
                    res.render('signUp', { title: 'Sign up', message_signup: err });
                    return;
                }
                res.render("index", { message: "The user has been activated." });
                // req.app.set('message_home', "The user has been activated.")
                // return res.redirect("/");
            });
        }
        else
        {
            res.render('signUp', { title: 'Sign up', message_signup: "The user with provided id doesn't exist" });
            return;
        }
    });
}