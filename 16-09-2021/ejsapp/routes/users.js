var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('<h1 style="color:red">User Information</h1> <img src="/images/burjAi.jpg" height="360px" alt="hello">');
});

router.get('/about', function(req, res, next) {
  res.send('<h1 style="color:red">Users - About Page </h1> <img src="/images/highway.jpeg" height="360px" alt="hello">');
});

router.get('/contact', function(req, res, next) {
  res.send('<h1 style="color:red">Users - Contact Page </h1><h3>Conatct Number : 8000488942 </h3> <img src="/images/lumi.jpeg" height="360px" alt="hello">');
});

module.exports = router;
