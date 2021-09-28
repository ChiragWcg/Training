var express = require('express');
var router = express.Router();

// Load model
var UserModel = require('../model/user_model');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Handlebars Template Engine' });
});


// Signup page
router.get('/signup', function (req, res, next) {
  res.render('signup');
});

router.post('/signup', function (req, res, next) {
  console.log(req.body);
  console.log(req.body.gender);

  var mydata = {
    name: req.body.name,
    contact: req.body.contact,
    email: req.body.email,
    password: req.body.password,
    dob: req.body.dob,
    gender: req.body.gender,
  };

  var data = UserModel(mydata);

  data.save(function (err) {
    if (err) {
      console.log('Error in data insertion..');
    }
    else {
      console.log('Data insert..');
      res.render('signup');
    }
  })
});


// Login page
router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', function (req, res, next) {

  var email = req.body.email;
  var password = req.body.password;
  // console.log(req.body);

  UserModel.findOne({ 'email': email }, function (err, data) {
    console.log('Find by one' + data);

    // console.log('db_data.email' + email);
    // console.log('db_data.password' + password);

    if (email == null) {
      console.log('If');
      res.end('Email not found');
    }

    else if (email == data.email && password == data.password) {
      req.session.email = email;
      res.redirect('/home');
    }
    else {
      console.log('Wrong crendials');
      res.end('Login Invalid...');
    }
  });
});


// Home page
router.get('/home', function (req, res, next) {
  console.log('Home Page ' + req.session.email);
  var myemail = req.session.email;

  if (!req.session.email) {
    console.log('Email session is set');
    res.end('Login required to access this page..');
  }

  res.render("home", { email: myemail });
});


// Change password - GET
router.get('/change-password', function (req, res, next) {
  if (!req.session.email) {
    console.log('Email session is set');
    res.redirect('/login');
  }
  res.render('change-password');
});

// Change password - POST
router.post('/change-password', function (req, res, next) {
  if (!req.session.email) {
    console.log("Email Session is Set");
    res.redirect('/login');
  }

  console.log("Home.." + req.session.email);
  var email = req.session.email;
  var opass = req.body.opass;
  var npass = req.body.npass;
  var cpass = req.body.cpass;

  UserModel.findOne({ "email": email }, function (err, data) {
    if (err) {
      console.log("Error in old password fetching " + err);
    }
    else {
      console.log(data);

      if (opass == data.password) {
        if (opass == npass) {
          res.end("New password must be different then old...");
        }
        else {
          if (npass == cpass) {

            UserModel.findOneAndUpdate({ "email": email }, { $set: { "password": npass } }, function (err) {
              if (err) {
                res.end("Error in update password" + err);
              }
              else {
                res.send("Password changed");
              }
            });
          }
          else {
            res.end("New password and confirm password that not match..");
          }
        }
      }
      else {
        res.end("Old password not match..");
      }
    }
  });
});


// Logout 
router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});


// Display data 
router.get('/display', function (req, res, next) {
  UserModel.find(function (err, data) {
    if (err) {
      console.log('Error in display data' + err);
    }
    else {
      console.log(data);
      res.render('display', { data: data });
    }
  }).lean();
});


// Delete record
router.get('/delete/:id', function (req, res, next) {
  var deleteId = req.params.id;
  UserModel.findByIdAndDelete(deleteId, function (err, data) {
    if (err) {
      console.log('Error in delete data');
    }
    else {
      console.log('Data deleted' + data);
      res.redirect('/display');
    }
  })
});


// Edit record
router.get('/edit/:id', function (req, res, next) {
  var editId = req.params.id;

  UserModel.findById(editId, function (err, data) {
    if (err) {
      console.log('Error in edit data');
    }
    else {
      console.log('Data edited' + data);
      res.render('edit', { data: data });
    }
  }).lean();
});

router.post('/edit/:id', function (req, res, next) {
  var editId = req.params.id;

  var mydata = {
    name: req.body.name,
    contact: req.body.contact,
    email: req.body.email,
  }

  UserModel.findByIdAndUpdate(editId, mydata, function (err, data) {
    if (err) {
      console.log('Error in edit data');
    }
    else {
      console.log('Data edited' + data);
      res.redirect('/display');
    }
  });
});

module.exports = router;
