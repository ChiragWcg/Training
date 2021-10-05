var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'File Upload App' });
});

router.get('/form', function (req, res, next) {
  res.render('form', { title: 'file_upload()' });
});

router.post('/form', function (req, res, next) {
  var fileobject = req.files.file123;
  var filename = req.files.file123.name;
  var size = req.files.file123.size;
  var mimetype = req.files.file123.mimetype;

  if ((req.files.file123.size < 2 * 1024 * 1024)&&(req.files.file123.mimetype == "image/jpeg")) {
    fileobject.mv('public/' + filename, function (err) {
      if (err)
        return res.status(500).send(err);
      res.send('File uploaded!');
    });
  }
  else {
    res.send('File must be jpg/png/jpeg OR Max File size 2 MB Only');
  }

  
});

module.exports = router;
