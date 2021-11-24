const admin = require("../../model/admin");
var session = require('express-session')

module.exports.getLogin = function(req, res, next) {
    res.render("admin/login", { layout: "demo1.hbs" });
}

module.exports.postLogin = function(req, res, next) {

    let email = req.body.email;
    let password = req.body.password;
    // console.log('UserSide na Email and password' + req.body.email);
    // console.log('UserSide na Email and password' + req.body.password);
    admin.findOne({ email: email }).lean().then((data) => {

        if (data == null) {
            return res.json('Email or Password Invalid...')
        } 
        else {

            if (password == data.password) {
                req.session.email = email;
                console.log('this is a Session' + req.session._id);
                res.redirect('/admin/dashboard')

            } else {
                res.json('Email Or PAssword Are Invallid....')
            }
        }

    }).catch((error) => {
        throw error
    })

}