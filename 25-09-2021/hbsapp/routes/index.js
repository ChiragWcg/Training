var express = require('express');
var router = express.Router();

var UserModel = require('../schema/user_table');

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

  var mydata = {
    name: req.body.txt1,
    email: req.body.email1,
    contact: req.body.con1,
    gender: req.body.gender,
    dob: req.body.dob1,
    password: req.body.pass1,
    isadmin: req.body.admin1,
  }
  var data = UserModel(mydata);

  data.save(function (err) {
    if (err) {
      console.log("Error in data insertion.." + err);
    } else {
      res.render('signup');
    }
  })
});


// Login page
router.get('/login', function (req, res, next) {
  res.render('login');
});

router.post('/login', function (req, res, next) {
  var email = req.body.email1;
  var password = req.body.pass1;

  console.log(req.body);
  UserModel.findOne({ 'email': email }, function (err, data) {
    console.log('Find by one' + data);

    if (data) {
      var db_email = data.email;
      var db_password = data.password;
    }

    console.log('data.email' + db_email);
    console.log('data.password' + db_password);

    if (db_email == null) {
      console.log("If");
      res.end('Email not found');
    }
    else if (db_email == email && db_password == password) {
      req.session.email = email;
      res.redirect('/home');
    }
    else {
      console.log('Wrong credentials...');
      res.end('Login invalid');
    }
  });
});


//Home page
router.get('/home', function (req, res, next) {
  console.log('Home Page' + req.session.email);
  var email = req.session.email;
  console.log(email);

  if (!req.session.email) {
    console.log('Email session is set');
    res.end('Login required to access this page...');
  }
  res.render('home', { email: email });
});


// Change password - Get
router.get('/change-password', function (req, res, next) {
  if (!req.session.email) {
    console.log('Email session is set..');
    res.redirect('/login');
  }
  res.render('change-password');
});

// Change password - Post
router.get('/change-password', function (req, res, next) {
  if (!req.session.email) {
    console.log('Email session is set');
    res.redirect('/login');
  }

  console.log('Home Page' + req.session.email);
  var email = req.session.email;
  var opass = req.body.opass;
  var npass = req.body.npass;
  var cpass = req.body.cpass;

  UserModel.findOne({ 'email': email }, function (err, data) {
    if (err) {
      console.log('Error in old password featching process' + err);
    }
    else {
      console.log(data);

      if (opass = data.pass1) {
        if (opass == npass) {
          res.end("New password is must be different from the old password");
        }
        else {
          if (npass == cpass) {
            UserModel.findOneAndUpdate({ 'User_email': email }, { $set: { 'password': npass } }, function (err) {
              if (err) {
                res.end('Error in update password' + err);
              }
              else {
                res.send('Password changed');
              }
            });

          }
          else {
            res.end('New password and confirm password not match');
          }
        }
      }
      else {
        res.end('Old password not match');
      }
    }
  });
});


//Logout page
router.get('/logout', function (req, res) {
  res.session.destroy();
  res.redirect("/");
});


//Forgot password
router.get('/forgot-password', function (req, res, next) {
  res.render("forgot-password");
});


router.post('/forgot-password', function (req, res, next) {

  var email = req.body.email;

  console.log(req.body);
  UsersModel.findOne({ "user_email": email }, function (err, data) {

    console.log("Find one.. " + data);

    if (data) {
      var db_email = data.email;
      var db_password = data.password;
    }

    console.log("data.user_email " + db_email);
    console.log("data.user_password " + db_password);

    if (db_email == null) {
      console.log("If");
      res.end("Email not Found");
    }
    else if (db_email == email) {


      "use strict";
      const nodemailer = require("nodemailer");

      // async..await is not allowed in global scope, must use a wrapper
      async function main() {

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let account = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: account.user, // generated ethereal user
            pass: account.pass // generated ethereal password
          }
        });

        // setup email data with unicode symbols
        let mailOptions = {
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: email, // list of receivers
          subject: "Forgot Password", // Subject line
          text: "Hello your password is " + db_password, // plain text body
          html: "Hello your password is " + db_password // html body
        };

        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions)

        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.end("Password Sent on your Email");
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      }

      main().catch(console.error);
    }
    else {
      console.log("Wrong Credentials");
      res.end("Login invalid...");
    }
  });
});


//Display table
router.get('/display', function (req, res, next) {

  UserModel.find(function (err, data) {
    if (err) {
      console.log("Error in fetching data " + err);
    }
    else {
      console.log(data);
      res.render('display', { data: data });
    }
  });
});


//Show single record
router.get('/show/:id', function (req, res) {
  console.log(req.params.id);

  UsersModel.findById(req.params.id, function (err, data) {
    if (err) {
      console.log("Error in fetching single Record" + err);
    }
    else {
      console.log(data);

      res.render('single-record', { data: data });
    }
  });
});


//Delete record
router.get('/delete/:id', function (req, res) {
  UsersModel.findOneAndDelete(req.params.id, function (err, project) {
    if (err) {
      console.log("Error in delete record" + err);
      res.redirect('/display');
    }
    else {
      console.log("Record deleted...");
      res.redirect('/display');
    }
  });
});


//Edit record
router.get('/edit/:id', function (req, res) {
  console.log(req.params.id);

  UsersModel.findById(req.params.id, function (err, data) {
    if (err) {
      console.log("Error in edit record " + err);
    }
    else {
      console.log(data);
      res.render('edit', { data: data });
    }
  });
});


//Update record
router.post('/edit/:id', function (req, res) {
  console.log("EditId is" + req.params.id);

  const mydata = {
    name: req.body.name,
    mobile: req.body.mobile
  }

  UsersModel.findByIdAndUpdate(req.params.id, mydata, function (err) {
    if (err) {
      console.log("Error in update record");
      res.redirect('/display');
    }
    else {
      res.redirect('/display');
    }
  });
});

module.exports = router;
