var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('<center><h1>Gallery</h1></center> <img src="https://source.unsplash.com/1000x500/?animals" style="margin-left:180px"><br><br> <img src="https://source.unsplash.com/1000x500/?colors,nature" style="margin-left:180px"><br><br> <img src="https://source.unsplash.com/1000x500/?birds" style="margin-left:180px">');
});

router.get('/towers', function (req, res, next) {
  res.send('<center><h1>Buildings & Towers</h1></center><img src="https://source.unsplash.com/1000x500/?building" style="margin-left:180px"><br><br> <img src="https://source.unsplash.com/1000x500/?flats" style="margin-left:180px"><br><br> <img src="https://source.unsplash.com/1000x500/?towers" style="margin-left:180px">');
});

router.get('/animals', function (req, res, next) {
  res.send('<center><h1>Animals Photo Collection</h1></center><img src="https://source.unsplash.com/1000x500/?lions" style="margin-left:180px"><br><br> <img src="https://source.unsplash.com/1000x500/?wild" style="margin-left:180px"><br><br> <img src="https://source.unsplash.com/1000x500/?tigers" style="margin-left:180px">');
});

module.exports = router;
