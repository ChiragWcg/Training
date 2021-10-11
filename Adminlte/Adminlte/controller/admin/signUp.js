const admin = require('../../model/admin');

module.exports.getSignUp = function(req, res, next) {
    res.render("admin/signUp", { layout: "demo1.hbs" });
}

module.exports.postSignUp = function(req, res, next) {

    var bodydata = {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password,

    }

    var data = new admin(bodydata)

    data.save((error) => {

        if (error) {
            console.log('Error During the insert Record');
        } else {
            console.log('Record Insert .!');
            console.log(data);
            res.redirect('/admin/login')
        }
    })

}