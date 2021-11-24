const admin = require('../../model/admin');

module.exports.getchangepassword = function(req, res, next) {
    res.render("admin/changepassword", { layout: "demo1.hbs" });
}

module.exports.postchangepassword = function(req, res, next) {

}