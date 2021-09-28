var express = require('express');
var router = express.Router();

//Load Model
var UserModel = require('../model/user_model');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'HandleBars Template Engine' });
});

router.get('/form', function (req, res, next) {
  res.render('form');
});

router.post('/form', function (req, res, next) {
  console.log(req.body);

  var mydata = {
    name: req.body.name,
    contact: req.body.contact,
    email: req.body.email,
  }

  var data = UserModel(mydata);

  data.save(function (err) {
    if (err) {
      console.log('Error in data insertion..');
    }
    else {
      console.log('Record added');
      res.render('form');
    }
  });
});

router.get('/table', function (req, res, next) {
  UserModel.find(function (err, data) {
    if (err) {
      console.log('Error in display data');
    }
    else {
      console.log('Data displayed' + data);
      res.render('table', { user_array: data });
    }
  }).lean();
});

router.get('/delete/:id', function (req, res, next) {
  var deleteId = req.params.id;
  UserModel.findOneAndDelete(deleteId, function (err, data) {
    if (err) {
      console.log('Error in delete data');
    }
    else {
      console.log('Data deleted' + data);
      res.redirect('/table');
    }
  })
});

router.get('/edit/:id', function (req, res, next) {
  var editId = req.params.id;

  UserModel.findById(editId, function (err, data) {
    if (err) {
      console.log('Error in edit data');
    }
    else {
      console.log('Data edited' + data);
      res.render('edit', { editdata: data });
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
      res.redirect('/table');
    }
  });
});

module.exports = router;
