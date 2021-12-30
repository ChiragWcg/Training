let categoryModel = require('../model/category');
let productModel = require('../model/product');

let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  let category = await categoryModel.find().lean();
  let products = await productModel.find().lean().populate("_category");
  console.log('Prod data', JSON.stringify(products));
  res.render('index', {category, products});
});

router.post('/', async function(req, res, next) {
  let productName = req.body.productName;
  let _category = req.body._category;

  await productModel.create({productName : productName, _category: _category});
  res.redirect('/');
  
});




module.exports = router;
