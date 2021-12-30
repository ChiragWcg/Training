const user = require('../model/user');

let express = require('express');
let router = express.Router();
const multer = require('multer');
const { Parser } = require('json2csv');

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
      // 'imagefile': req.file.filename,
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
        // console.log(pageNo);

        let limitValue = 4;
        let skipValue = limitValue * (pageNo - 1);
        // console.log(skipValue);
       
        sort[req.body.sortField] = req.body.sortOrder;
        let modeldata = await user.find().sort(sort).collation({locale: "en" }).skip(skipValue).limit(limitValue);
        let modeldata2 = await user.count();
        let pageValue = Math.ceil(modeldata2/limitValue);
        // console.log('Floor value');
        // console.log(pageValue);
        res.send({
          type: 'sucsess',
          result: modeldata,
          result2: pageValue,
        });     
    }

    // Searching
    else if(req.body.type == 'searching'){
            
        // console.log('Serching route ------');
        // console.log(req.body.searchField);

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
      console.log(JSON.stringify(req.body));

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

      let fileName = "Exports data ..." + moment().format("YYYY-MM-DD hh:mm")+".csv"; 
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
      // console.log('Sorting------');
      // console.log(modeldata);

      // res.render('index', { user: modeldata, countrecords:modeldata2});
      // if (modeldata) {
      //   res.send({
      //     type: 'success',
      //     result: modeldata
      //   })
      // }
      
    }
  }
  catch (err) {
    res.json({ message: 'Error in sorting data..' })
    console.log(err);
  }
})


// Pagination

// router.post('/pagination', async function (req, res, next) {
//   try {
//     let skipValue = 0;
//     let limitValue = 5;
//     let modeldata = await user.find().skip(skipValue).limit(limitValue);
//     let recordsValue = await user.find().count();

//     console.log('Count record ----');
//     console.log(recordsValue);
//     console.log('ButtonId -----');
//     console.log(req.body.page);
//     let newBtnId = req.body.page;
//     res.json(modeldata);


//     // if(newBtnId == '1'){
//     //   console.log('Pagination data router -----------');
//     //   skipValue += 5;
//     //   res.json(modeldata);
//     // }

//     // if (modeldata) {
//     // console.log('Pagination data router -----------');
//     // console.log(modeldata);
//     // res.json(modeldata);
//     // res.send({
//     //   type: 'success',
//     //   result: modeldata,
//     // })
//     // }

//   }
//   catch (err) {
//     res.json({ message: 'Error in pagination...' });
//     console.log(err);
//   }
// })

router.get("/test/router/:userid/:useremail", function(req, res, next){
  
  console.log(req.params);
  console.log(req.query);
  res.status(201).json({data : "hello"})
})


module.exports = router;
