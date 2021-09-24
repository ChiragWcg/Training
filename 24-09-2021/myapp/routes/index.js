var express = require('express');
var router = express.Router();

//Model Loading
var UserModel = require('../models/user_model');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/form', function (req, res, next) {
  res.render('form');
});

router.post('/form', function (req, res, next) {

  var mydata = {
    name: req.body.txt1,
    email: req.body.email1,
    contact: req.body.con1
  }
  var data = UserModel(mydata);

  data.save(function (err) {
    if (err) {
      console.log('Error in data insertion...' + err);
    }
    else {
      console.log('Record added successfully');
      res.redirect('/form');
    }
  });

});

router.get('/table', function (req, res, next) {
  UserModel.find(function (err, data) {
    if (err) {
      console.log('Error in display data..' + err);
    }
    else {
      console.log('Record Data is' + data);
      res.render('table', { mydatas: data });
    }
  }).lean();
});

router.get('/delete/:id', function (req, res, next) {
  var deleteid = req.params.id;
  UserModel.findByIdAndDelete(deleteid, function (err, data) {
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

router.get('/edit/:id', function (req, res, next) {
  var editid = req.params.id;
  UserModel.findById(editid, function (err, data) {
    if (err) {
      console.log("Error in Edit" + err)
    } else {
      console.log(data);
      res.render('edit', { mydatas: data })
    }
  }).lean();

});

router.post('/edit/:id', function (req, res, next) {
  var editid = req.params.id;
  const mydata = {
    name: req.body.txt1,
    email: req.body.email1,
    contact: req.body.con1
  }

  UserModel.findByIdAndUpdate(editid, mydata, function (err, data) {
    if (err) {
      console.log("Error in Edit record" + err)
    }
    else {
      console.log("Record Updated Successfully" + data);
      res.redirect('/table');
    }
  }).lean();

});

module.exports = router;
