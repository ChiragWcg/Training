var express = require('express');
var router = express.Router();
var session = require('express-session');
const { getLogin, postLogin } = require('../controller/admin/login');
const { getSignUp, postSignUp } = require('../controller/admin/signUp');
const { getchangepassword, postchangepassword } = require('../controller/admin/changepassword');
// const { getdashboard, postdashboard } = require('../controller/admin/dashboard');
const { getforgotpassword, postforgotpassword } = require('../controller/admin/forgotpassword');
const { getcategory, postcategory } = require('../controller/category/category');


router.get('/dashboard', function(req, res, next) {
    res.render('index');
});

router.get('/login', getLogin);
router.post('/login', postLogin);

router.get('/signUp', getSignUp);
router.post('/signup', postSignUp);

router.get('/changepassword', getchangepassword);
router.post('/changepassword', postchangepassword);

router.get('/forgotpassword', getforgotpassword);
router.post('/forgotpassword', postforgotpassword);

router.get('/add', getcategory);
router.post('/category', postcategory);


// router.post('/users', Alogin_Controller.create);


module.exports = router;