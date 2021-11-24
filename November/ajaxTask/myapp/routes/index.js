const user = require('../model/user');

let express = require('express');
let router = express.Router();
const multer = require('multer');
const { Parser } = require('json2csv');
let moment = require('moment'); 
let fs = require('fs');

// Multer - for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })


/* GET home page. */
router.get('/', async function (req, res, next) {
  try {

    let modeldata = await user.find().skip(0).limit(4);
    res.render('index', { user: modeldata });

  }
  catch (error) {
    res.json({ message: 'Error in fetching data from model...' })
    console.log(error);
  }

});



// POST - router
router.post('/userdata', upload.single("imagefile"), async function (req, res, next) {

  try {
    const newUser = new user({
      'firstName': req.body.firstName,
      'lastName': req.body.lastName,
      'address': req.body.address,
      'gender': req.body.gender,
      'hobbies': req.body.hobbies,
      'imagefile': req.file.filename,
      'interest': req.body.interest,
    });

    console.log('Before save data...');

    let saveUser = await newUser.save();

    if (saveUser) {
      res.json(saveUser);
    }
    // console.log(saveUser);
    console.log('Data save successfully...');
  }

  catch (err) {
    res.json({ message: 'Error in data...' });
    console.log('err' + err);
  }

});


// EDIT - Get route
router.get('/edit/:id', async function (req, res, next) {
  console.log('EDIT id');
  console.log(req.params.id);
  try {
    let userid = await user.findById(req.params.id)
    res.json(userid);
  }
  catch (error) {
    res.json({ message: "Error in fetching the data from model..." });
  }

});


// PUT route
router.put('/edit/:id', upload.single("imagefile"), async function (req, res) {

  try {
    const userdata = {
      'firstName': req.body.firstName,
      'lastName': req.body.lastName,
      'address': req.body.address,
      'gender': req.body.gender,
      'hobbies': req.body.hobbies,
      'interest': req.body.interest,
    };


    if (req.file) {
      userdata.imagefile = req.file.filename;
    }
    let updatedUser = await user.findByIdAndUpdate(req.params.id, userdata, { new: true })
    res.json(updatedUser);
  }
  catch (err) {
    res.json({ message: "Error - Something Went Wrong" });
    console.log(err);
  }
})


// DELETE route
router.delete('/delete/:id', async function (req, res, next) {

  try {
    let userDelete = await user.findByIdAndDelete(req.params.id)
    console.log("deleted record ");
    res.json(userDelete);
  } catch (err) {
    res.json({ message: "Error During the Delete" })
  }

});


// Route -- Pagination || Searching || Sorting
router.post('/sortdata', async function (req, res, next) {
  let sort = {};

  try {
    // Pagination
    if (req.body.type == 'pagination') {      
        let pageNo = req.body.page;
        // console.log('Page no -----');

        let limitValue = 4;
        let skipValue = limitValue * (pageNo - 1);
        // console.log(skipValue);
       
        sort[req.body.sortField] = req.body.sortOrder;
        let modeldata = await user.find().sort(sort).collation({locale: "en" }).skip(skipValue).limit(limitValue);
        let modeldata2 = await user.count();
        let pageValue = Math.ceil(modeldata2/limitValue);
        res.send({
          type: 'sucsess',
          result: modeldata,
          result2: pageValue,
        });     
    }

    // Searching
    else if(req.body.type == 'searching'){
            
        // console.log('Serching route ------');

        let modeldata = {};
        if(req.body.searchField){
          modeldata = {
            $or : [{firstName :{ $regex: req.body.searchField, $options: "i" }}, {address:{$regex: req.body.searchField, $options: "i"}}],
          }
        }
        if(req.body.gender){
          modeldata.gender =  req.body.gender;
        }

        console.log('Search =========' + JSON.stringify(modeldata));
        
        let modeldata2 = await user.find(modeldata).collation({locale: "en" }).limit(4);
        res.json(modeldata2);
        
    }

    else if(req.body.type == 'exportdata'){
      console.log('Export route ======');
      let modeldata = await user.find();
      console.log('Modeldata in export');
      // console.log(modeldata);

      const fields = [
        {label: 'First Name', value:'firstName'},
        {label: 'Address', value:'address'},
      ];

      const json2csvparser = new Parser(fields);
      const csv = json2csvparser.parse(modeldata);

      console.log('CSV data.......');
      console.log(csv);

      // write file in specific folder with date time
      let fileName = "users-"+moment().format("DD-MMM-YYYY-hh-mm")+".csv"; 
      fs.writeFileSync('public/csvdata/'+fileName,csv)
      res.json(modeldata);
    }


    // Sorting
    else {
      console.log('Sort data in post -----------');
      console.log(JSON.stringify(req.body));
      let sort = {};
      sort[req.body.sortField] = req.body.sortOrder;
      let modeldata = await user.find().collation({locale: "en" }).sort(sort).limit(4);
      res.json(modeldata);     
      
    }
  }
  catch (err) {
    res.json({ message: 'Error in sorting data..' })
    console.log(err);
  }
})



module.exports = router;
