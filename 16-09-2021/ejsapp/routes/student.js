var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('<h1 style="color:blue">Student Information</h1> <img src="/images/light.jpeg" height="360px" alt="hello">');
});

router.get('/about', function(req, res, next) {
  res.send('<h1 style="color:blue">Student - About Page </h1> <img src="/images/lumi.jpeg" height="360px" alt="hello">');
});

router.get('/services', function(req, res, next) {
  res.send('<h1 style="color:blue">Student - Services Page </h1> <img src="/images/controller.jpeg" height="360px" alt="hello">');
});

router.get('/contact', function(req, res, next) {
  res.send('<h1 style="color:blue">Studnent - Contact Page </h1> <h3>Conatct Number : 9874988942</h3> <img src="/images/bulb.jpg" height="360px" alt="hello">');
});

module.exports = router;
