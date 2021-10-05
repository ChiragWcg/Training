var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Handlebars Template Engine' });
});

router.get('/login', function (req, res, next) {
  res.render('login');
});

// session creation
router.post('/login', function (req, res, next) {
  var name = req.body.txt1;
  // console.log(name);
  req.session.username = name;

  console.log("Session value is = " + req.session.username);
  res.redirect('/home');
});

// print session value on home
router.get('/home', function (req, res, next) {
  console.log('Session value in home = ' + req.session.username);
  if (req.session.username) {
    var user = req.session.username;
    res.render('home', { myuser: user });
  }
  else {
    res.redirect('/login');
  }
});

// logout from session
router.get('/logout', function (req, res, next) {
  req.session.destroy(function (err) {
    res.redirect('/login');
  });
});


// counter app in session
router.get('/counter', function (req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-type', 'text/html')
    res.write('<p>Views : ' + req.session.views + '</p>')
    res.write('<p>Expires in : ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  }
  else {
    req.session.views = 1
    res.end('Refresh your page')
  }
});

// cookie creation
router.get('/create-cookie', function (req, res, next) {
  res.cookie('User-1', 'Roy');
  res.cookie('User-2', 'Devil');

  // res.cookie('User-3', 'Jiyan',{maxAge:10000});
  res.cookie('User-3', 'Jiyan', { expires: new Date(Date.now() + 200000), httpOnly: true });
  res.send('Cookie created');
});

// get-cookie
router.get('/get-cookie', function (req, res, next) {
  var Cookies = JSON.stringify(req.cookies);
  return res.send(Cookies);
});

// clear-cookie
router.get('/clear-cookie', function (req, res, next) {
  res.clearCookie('User-1');
  res.send('Cookie deleted..');
});


// set color value on form
router.get('/form', function (req, res, next) {
  res.render('form');
});

// bgcolor value
router.post('/form', function (req, res, next) {
  var cname = req.body.txt2;
  console.log(cname);
  req.session.username = cname;

  console.log("Entered Color code is = " + req.session.username);
  res.redirect('/bghome');
});

// print color name on BGHome
router.get('/bghome', function (req, res, next) {
  console.log('Color name in BGhome = ' + req.session.username);
  if (req.session.username) {
    var color = req.session.username;
    res.render('bghome', { mycolor: color });
  }
  else {
    res.redirect('/form');
  }
});


// counter app using cookie
// router.get('/counter', function (req, res, next) {
//   if (req.session.views) {
//     req.session.views++
//     res.setHeader('Content-type', 'text/html')
//     res.write('<p>Views : ' + req.session.views + '</p>')
//     res.write('<p>Expires in : ' + (req.session.cookie.maxAge / 1000) + 's</p>')
//     res.end()
//   }
//   else {
//     req.session.views = 1
//     res.end('Please refresh...')
//   }
// });

module.exports = router;
