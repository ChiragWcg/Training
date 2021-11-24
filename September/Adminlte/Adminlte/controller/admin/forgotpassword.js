const admin = require('../../model/admin');

module.exports.getforgotpassword = function(req, res, next) {
    res.render("admin/forgotpassword", { layout: "demo1.hbs" });
}

module.exports.postforgotpassword = function(req, res, next) {

}