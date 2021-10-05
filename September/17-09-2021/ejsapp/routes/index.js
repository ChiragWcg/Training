var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'EJS Template Engine' });
});

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'About' });
});

router.get('/form', function (req, res, next) {
  res.render('form', { title: 'Form' });
});

router.post('/form', function (req, res, next) {
  console.log(req.body);

  // var a = parseInt(req.body.num1);
  // var b = parseInt(req.body.num2);
  // var c = a + b;

  var a = req.body.txt1;
  var b = req.body.txt2;
  var c = a + " " + b;

  // var msg = "";

  // if (c > 10) {
  //   msg = "A is > 10";
  // }
  // else {
  //   msg = "A is <10";
  // }
  // res.send(c);
  res.render('ans', { a, b, c });

});

router.get('/signup', function (req, res, next) {
  res.render('signup', { title: 'Signup Form' });
});

router.post('/signup', function (req, res, next) {
  console.log(req.body);

  var a = req.body.txt1;
  var b = req.body.txt2;
  var c = req.body.email1;
  var d = req.body.num1;
  var e = req.body.txt3;

  res.render('signupResult', { a, b, c, d, e });

});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login Page' });
});

router.post('/login', function (req, res, next) {
  console.log(req.body);

  var a = req.body.email1;
  var b = req.body.pass1;
  var email = 'home@gm.com';
  var pass = 129090;
  var msg = "";

  if ((a == email) && (b == pass)) {
    msg = 'Login Successfully...';
  }
  else {
    msg = 'Invalid details. Please enter correct details..';
  }

  res.render('loginResult', { a, b, msg });

});

router.get('/marksheet', function (req, res, next) {
  res.render('marksheet', { title: 'Marksheet Data' });
});

router.post('/marksheet', function (req, res, next) {
  console.log(req.body);

  var a = parseInt(req.body.num1);
  var b = parseInt(req.body.num2);
  var c = parseInt(req.body.num3);
  var d = parseInt(req.body.num4);
  var e = parseInt(req.body.num5);
  var score = (a + b + c + d + e);
  var result = score / 5;

  var msg = "";

  if (result >= 90) {
    msg = 'Distinction...';
  }
  else if ((result < 90) && (result >= 80)) {
    msg = 'Grade - A';
  }
  else if ((result < 80) && (result >= 70)) {
    msg = 'Grade - B';
  }
  else if ((result < 70) && (result >= 60)) {
    msg = 'Grade - C';
  }
  else if ((result < 60) && (result >= 50)) {
    msg = 'Grade - D';
  }
  else {
    msg = 'Your performance is very bad';
  }

  res.render('marksheetResult', { a, b, c, d, e, score, result, msg });

});

module.exports = router;
