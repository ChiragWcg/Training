var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/photos', function(req, res, next) {
  res.render('photos');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});


module.exports = router;
