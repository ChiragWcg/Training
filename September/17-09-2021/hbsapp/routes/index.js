var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HandleBars' });
});

router.get('/stampalike', function(req, res, next) {
  res.render('stampalike', { title: 'stampalike' });
});

router.get('/template', function(req, res, next) {
  res.render('template', { title: 'Template Demo' });
});

module.exports = router;