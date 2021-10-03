var express = require('express');
var router = express.Router();

//Model Loading
var UserModel = require('../models/user_model');
var ProductModel = require('../models/product_model');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'c$mart Products' });
});

router.get('/template', function (req, res, next) {
  res.render('template', { title: 'Products' });
});

router.get('/form', function (req, res, next) {
  res.render('form');
});

router.post('/form', function (req, res, next) {

  // console.log(req.files);
  // var fileobj = req.files.photo;
  // console.log(fileobj.name);

  var mydata = {
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    city: req.body.city,
    state: req.body.state,
    password: req.body.password,
    // photo: fileobj.name,
  }
  console.log(req.body.email);
  // fileobj.mv('public/images/' + fileobj.name, function (err) {
  //   if (err)
  //     return res.send("File not uploaded...");
  // });

  var data = new UserModel(mydata);

  data.save(function (err) {
    if (err) {
      console.log('Error in data insertion...' + err);
    }
    else {
      console.log('Signup successfully...');
      res.redirect('/login');
    }
  });
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
    console.log('Find by one' + data.email);

    console.log('data.email ' + data.email);
    console.log('data.password ' + data.password);

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
      // res.end('Login Invalid...');
      res.redirect('/')
    }
  });
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
// router.get('/logout', function (req, res) {
//   req.session.destroy();
//   res.redirect('/');
// });


// Forgot password - GET 
router.get('/forgot-password', function (req, res, next) {
  // res.render('forgot-password');
  if (!req.session.email) {
    console.log('Email session is not set');
    res.redirect('/login');
  }
  res.render('forgot-password');
});


// Forgot password - POST 
router.post('/forgot-password', function (req, res, next) {

  if (!req.session.email) {
    console.log("Email Session is not set");
    res.redirect('/login');
  }

  var email = req.body.email;
  console.log(req.body);
  // if (req.session.email) {

  UserModel.findOne({ "email": email }, function (err, data) {

    console.log("Find by one " + data);

    if (data) {
      var email = data.email;
      var password = data.password;
    }

    // console.log("data.email " + data.email);
    // console.log("data.password " + data.password);

    if (email == null) {
      console.log("If...");
      res.end("Email not found...");
    }
    else if (email == email) {

      "use strict";
      const nodemailer = require("nodemailer");

      async function main() {

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let account = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          // host: "smtp.ethereal.email",
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: "testing.chiragpatel@gmail.com", // generated ethereal user
            pass: "chirag.test@11"// generated ethereal password
          }
        });

        let mailOptions = {
          from: 'testing.chiragpatel@gmail.com', // sender address
          to: "reply.chiragpatel@gmail.com", // receiver
          subject: "Nodemailer - For email sending ✔", // Subject 
          text: "<b>Your password is...</b> " + password, // text body
          html: "<b>your password is...</b> " + password // html body
        };

        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions)

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.end("Password sent to your email...");
      }

      main().catch(console.error);
      res.render('login');
    }

    else {
      console.log("Credentials wrong");
      res.end("Login invalid");
    }

  });
  // }
  // else {
  //   res.redirect('/form');
  //   console.log('First, you need to signup yourself')
  // }
});


//Product Page
router.get('/product', function (req, res, next) {
  res.render('product');
});

router.post('/product', function (req, res, next) {

  //File code
  if (req.session.email) {
    console.log("Email Session -- " + req.session.email);
    console.log(req.files.photo.name);
    var mydata2 = {
      pname: req.body.pname,
      category: req.body.category,
      details: req.body.details,
      price: req.body.price,
      photo: req.files.photo.name,
      // photo: fileobj.name,
      qty: req.body.qty,
    };

    var img = req.files.photo;
    var tempData = ProductModel(mydata2);

    img.mv(`public/images/${req.files.photo.name}`, (err) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        tempData.save((err, result) => {
          if (err) {
            throw err;
          } else {
            res.redirect("/table");
          }
        });
      }
    });
  }
  else {
    res.redirect("/admin");
  }
});


// Home page
router.get('/home', function (req, res, next) {
  console.log('Home Page ' + req.session.email);
  var email = req.session.email;

  if (!req.session.email) {
    console.log('Email session is set');
    console.log('Login required to access this page');
    res.render('admin');
    // res.end('Login required to access this page..');
  }

  res.render("home", { email: email });
});



//Admin Page
router.get('/admin', function (req, res) {
  res.render('admin');
});

router.post('/admin', function (req, res) {

  if (req.body.aemail == "admin@gm.com" && req.body.adminpass == "admin123") {
    req.session.email = req.body.aemail;
    console.log(req.session.email);
    res.render('adminhome');
  }

  else {
    console.log('If you admin, Please enter correct details...')
    res.redirect('admin');
  }

});


//Admin Home Page
router.get('/adminhome', function (req, res) {
  if (req.session.aemail) {
    res.render('adminhome');
  }
  else {
    res.redirect('/admin');
  }
});


// Display Products to USER
router.get('/display', function (req, res, next) {
  ProductModel.find(function (err, data) {
    if (err) {
      console.log('Error in display data..' + err);
    }
    else {
      console.log('Record Data is' + data);
      res.render('display', { data: data });
    }
  }).lean();
});


router.get('/template', function (req, res, next) {
  ProductModel.find(function (err, data) {
    if (err) {
      console.log('Error in display data..' + err);
    }
    else {
      console.log('Record Data is' + data);
      res.render('display', { data: data });
    }
  }).lean();
});


// Display Products
router.get('/table', function (req, res, next) {
  console.log("Session at display product - " + req.session.email);
  if (req.session.email) {
    ProductModel.find(function (err, data) {
      if (err) {
        console.log('Error in display data..' + err);
      }
      else {
        console.log('Record Data is' + data);
        res.render('table', { data: data });
      }
    }).lean();
  }
  else {
    res.redirect('/');
  }
});


// Display User Details
router.get('/displayform', function (req, res, next) {
  if (req.session.email) {
    UserModel.find(function (err, data) {
      if (err) {
        console.log('Error in display data..' + err);
      }
      else {
        console.log('Record Data is' + data);
        res.render('displayform', { data: data });
      }
    }).lean();
  }
  else {
    res.redirect('/admin');
  }
});



// Logout 
router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});


// Delete
router.get('/delete/:id', function (req, res, next) {
  var deleteid = req.params.id;
  ProductModel.findByIdAndDelete(deleteid, function (err, data) {
    if (err) {
      console.log("Error in delete data " + err);
    }
    else {
      console.log("Record Deleted " + deleteid);
      res.redirect('/table');
    }
  })
  res.render('form');
});



// Edit - GET
router.get('/edit/:id', function (req, res, next) {
  var editid = req.params.id;
  ProductModel.findById(editid, function (err, data) {
    if (err) {
      console.log("Error in edit..." + err)
    } else {
      console.log(data);
      res.render('edit', { data: data })
    }
  }).lean();

});


//Edit - POST
router.post('/edit/:id', function (req, res, next) {
  var editid = req.params.id;
  const mydata = {
    pname: req.body.pname,
    category: req.body.category,
    details: req.body.details,
    price: req.body.price,
    photo: req.files.photo.name,
    qty: req.body.qty,
  }
  console.log(req.files.photo.name);

  var img = req.files.photo;
  // var tempData = ProductModel(mydata);

  img.mv(`public/images/${req.files.photo.name}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    // else {
    //   res.redirect("/table");
    // }    

  });


  ProductModel.findByIdAndUpdate(editid, mydata, function (err, data) {
    if (err) {
      console.log("Error in edit product" + err)
    }
    else {
      console.log("Product updated successfully.." + data);
      res.redirect('/table');
    }
  }).lean();
});



module.exports = router;
