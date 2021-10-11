module.exports.getLogin = function(req, res, next) {
    res.render("admin/login", { layout: "demo1.hbs" });
}

module.exports.postLogin = function(req, res, next) {

}