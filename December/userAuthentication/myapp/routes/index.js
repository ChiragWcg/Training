let express = require('express');
let router = express.Router();
let fileModel = require('../model/fileModel');
let userModel = require('../model/userModel');
let fieldModel = require('../model/fieldModel');
let jwt = require('jsonwebtoken');
let passport = require("passport");
let { check, validationResult } = require('express-validator');
let { Parser } = require('json2csv');
let multer = require('multer');
let moment = require('moment');
let fs = require('fs');
let csv = require('csvtojson');


// Multer - for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/csvfiles')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })


/* GET home page. */
router.get('/', AuthJWT, async function (req, res, next) {
  try {
    // render index page
    res.render('index');
  }
  catch (error) {
    console.log(error);
  }
});




// Login page
router.get('/userLogin', function (req, res, next) {
  // render userLogin page
  res.render('userLogin');
});

router.post("/userLogin", async function (req, res, next) {
  try {
    var email = req.body.email;

    console.log("Text field data ----==----", JSON.stringify(email));
    // OR condition for get the value of email or contact as email field
    let user = await userModel.findOne({ $or: [{ email: req.body.email }, { contact: req.body.email }] })
    // console.log('Login user...', user);

    if (user) {
      // get the user name, email, id as params    
      let params = { userId: user._id, email: user.email, name: user.name };
      // console.log('------------', params);
      // verify the db password and user entered password
      if (user.password == req.body.password) {
        const token = jwt.sign({ params }, "chirag", { expiresIn: 7000000 });
        // console.log("Token ----++++", token);
        res.cookie('token', token);
        // console.log("Token api- Cokkie ========= ", token);
        // res.redirect('/addUser');

        // send the token with type success and message
        res.send({
          type: 'success',
          token: token,
          message: 'login',
          status: 200
        })
        // return res.status(200).json({ user, token });
      }
      else {
        // return res.json({ error: "password invalid....2" });
        // display error as password invalid
        return res.send({
          type: 'error',
          message: 'password invalid'
        })
      }
    }
    else {
      // display error as type error as email or contact invalid
      return res.send({
        type: 'error',
        message: 'email or contact invalid...'
      })
      // return res.json({ error: "email or contact invalid..." });
    }
  }
  catch (error) {
    // redirect on the userLogin page if found the error 
    console.log('Wrong crendials', error);
    res.redirect('/userLogin')
  }
});


// Add user
router.get('/addUser', AuthJWT, function (req, res, next) {
  // render addUser page
  res.render('addUser');
});

router.post('/addUser',
  [
    check("name", "Name length should be 10 to 20 characters").isLength({
      min: 2,
      max: 20,
    }),
    check("email", "email should be 10 to 20 characters")
      .isEmail()
      .isLength({ min: 10, max: 30 }),
    check("contact", "Contact number should contains 10 digits").isLength({
      min: 10,
      max: 10,
    }),
    check("password", "Password should be 6 to 10 characters").isLength({
      min: 6,
      max: 10,
    }),
  ],
  async function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // find email or contact in the userModel
      let user = await userModel.find({ $or: [{ email: req.body.email }, { contact: req.body.contact }] }).lean();
      if (user.length == 0) {
        // store the name, email, contact, password in the userModel
        await userModel.create({
          name: req.body.name,
          email: req.body.email,
          contact: req.body.contact,
          password: req.body.password
        })
        // fetch the userModel data and store it into modedata variable
        let modeldata = await userModel.find().lean();
        // send success response with modeldata and message
        res.send({
          type: 'success',
          data: modeldata,
          message: 'user inserted',
          status: 200
        })
      }
      else {
        console.log('Email exists..');
        // display error as type error with message
        res.send({
          type: 'error',
          message: 'Data already exists..'
        })
      }
    }
    catch (error) {
      // display error as type error with message
      res.send({
        type: 'error',
        message: 'Something went wrong..'
      })
    }
  })


// Get all users
router.get('/users', AuthJWT, async function (req, res, next) {
  try {
    // fecth all records of userModel and store into user variable
    let user = await userModel.find().lean();
    if (user) {
      // render users router with userModel data
      res.render('users', { user });
    }
    else {
      // display error as type error with message
      return res.send({
        type: 'error',
        message: 'data not fetched.....'
      })
      // return res.json({ error: "data not fetched....." });
    }
  }
  catch (error) {
    console.log(error);
    // display error as type - error, if data not fetched inside the model
    return res.send({
      type: 'error',
      message: 'data not fetched.....'
    })
    // return res.json({ error: "data not fetched.." });
  }
});


// API - Get all users
router.post('/users', async function (req, res, next) {
  try {
    // fecth all records of userModel and store into user variable
    let user = await userModel.find().lean();
    if (user) {
      res.send({
        type: 'success',
        message: 'data fetched..',
        data: user
      })
    }
    else {
      // display error as type - error with message
      return res.send({
        type: 'error',
        message: 'data not fetched.....'
      })
      // return res.json({ error: "data not fetched....." });
    }
  }
  catch (error) {
    console.log(error)
    // display error as type error, if data not fetched inside the model
    return res.send({
      type: 'error',
      message: 'data not fetched.....'
    })
    // return res.json({ error: "data not fetched.." });
  }
});



// import csv files
router.post('/import', AuthJWT, upload.single("file"), async function (req, res, next) {
  let objKeys;
  let objValues;
  try {
    // console.log('Before fetch data...', req.file.path);
    // fecth fileName & userID and store into an newUser object 
    let newUser = {
      name: req.file.filename,
      uploadedBy: req.user.params.userId
    }
    // console.log('newUser -------', newUser);

    // Store newUser object into fileModel and access using result variable
    let result = await fileModel.create(newUser);
    // console.log('Result data ', result);
    // console.log('File id ====== ', result._id);

    // convert csv files to json as jsonArray
    let jsonArray = await csv({ noheader: true }).fromFile(req.file.path);
    // console.log('jsonArray--------Niz', jsonArray);

    let field = ["name", "email", "contact"];

    // find all records from the fieldModel 
    let newFields = await fieldModel.find().lean();
    // console.log('new fields Before -------- ', newFields);

    // map newFields with fieldVal 
    newFields = newFields.map(function (fieldObj) {
      // console.log('fieldObj.fieldval.....-------', fieldObj.fieldVal);
      return fieldObj.fieldVal
    })
    // console.log('newFields After-------', newFields);

    // concat newFields with field array
    let allFields = field.concat(newFields)
    // console.log('All fields------', allFields);

    // get the keys and values of csv file
    let header = Object.keys(jsonArray[0]);
    let firstRow = Object.values(jsonArray[0]);
    let secondRow = Object.values(jsonArray[1]);
    // console.log('header-----', header);
    // console.log('firstRow------', firstRow);
    // console.log('secondRow------', secondRow);

    // send json response with keys, values, fileName and Id
    res.json({
      header: header,
      firstRow: firstRow,
      secondRow: secondRow,
      fileName: req.file.filename,
      fileId: result._id,
      allFields: allFields
    })
    // console.log('Data fetched...');
  }

  catch (err) {
    //  display error as type - error with message
    res.send({
      type: 'error',
      message: 'Error in data...'
    })
    // res.json({ message: 'Error in data...' });
    console.log('err' + err);
  }
});



// blank array of emails and contacts
let emails = [];
let contacts = [];
function checkDuplicateInCsv(email, contact) {
  return emails.includes(email) || contacts.includes(contact)
}

// validation for email
let validEmail = function (email) {
  let regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  return email.match(regex);
}

// validation for contact
let validContact = function (contact) {
  let regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  return contact.match(regex);
}


// map the csv files - fields with db fields
router.post('/mapRoute/:data', AuthJWT, async function (req, res, next) {
  
  let bodyData = JSON.parse(req.body.data);
  try {
    await fileModel.updateOne({ _id: req.params.data }, {$set : { fieldMappingObject:  bodyData.mapObject, skipFirstRow : bodyData.skipHeader}});
    res.json({
      type: 'success',
      message: 'file uploaded...'
    })
  }
  catch (error) {
    res.send({
      type: 'error',
      message: 'something went wrong...'
    })
  }
  
  return;

  // console.log(' File ID -----------', typeof bodyData.skipHeader);
  // console.log('Map object ---------- ', bodyData.mapObject);
  // declare  global variable - validUser, invalidUser, duplicateUser and jsonArray, finalUser as Array
  let validUser = 0;
  let invalidUser = 0;
  let duplicateUser = 0;
  let finalUser = [];
  let mapObject = bodyData.mapObject;
  let jsonArray;
  let duplicateUserInCsv = 0;

  // find the specific record with id as result
  let result = await fileModel.findOne({ _id: req.params.data });
  console.log('File name ---- ', result.name);

  // store csv files path in the csvFilePath variable
  let csvFilePath = './public/csvfiles/' + result.name;

  // convert csv files to json
  jsonArray = await csv({ noheader: true }).fromFile(csvFilePath);
  // console.log('jsonArray--------');

  if (jsonArray) {
    // console.log('req.params--------',req.params);
    if (bodyData.skipHeader) {
      jsonArray = jsonArray.slice(1);
      var data = await fileModel.updateOne({ _id: req.params.data }, { skipFirstRow: "true", fieldMappingObject: req.body })
      // console.log("req.params ------- ", req.params)
    }
    
    // console.log('jsonArray--------', jsonArray);

    // fetch the each record of jsonArray as user
    for (let user of jsonArray) {
      // console.log(user);
      let email = user[mapObject['email']];
      let name = user[mapObject['name']];
      let contact = user[mapObject['contact']];
      // console.log('name-------', name);
      // console.log('mapObject -------', mapObject);

      if (checkDuplicateInCsv(email, contact)) {
        duplicateUserInCsv++;
        console.log('duplicateUserInCsv--------', duplicateUserInCsv);
      }
      else {
        emails.push(email);
        contacts.push(contact);
      }

      if (name && email && validEmail(email) && contact && validContact(contact)) {
        // find user email or contact 
        let data = await userModel.findOne({ $or: [{ email: email }, { contact: contact }] })
        // console.log('jsonDATA--------', data);

        if (data) {
          duplicateUser++;
        }
        else {
          validUser++;
          // userObject 
          let userObj = {}
          for (const field in mapObject) {
            userObj[field] = user[mapObject[field]]
          }
          // push userObj in the finalUser
          finalUser.push(userObj);
        }
      }
      else {
        invalidUser++;
      }
    }


    // emails = [];
    // contacts = [];
    // update the userModel with finalUser array
    let uploadedUsers = await userModel.insertMany(finalUser);
    // console.log('Total uploaded users length', totalUploadedUsers);
    // console.log(finalUser);

    // update the value of totalRecords, duplicateuser, invalidUser and status into fileModel
    await fileModel.updateOne(
      { _id: req.params.data },
      {
        totalRecords: jsonArray.length,
        duplicates: duplicateUser,
        discarded: invalidUser,
        totalUploaded: validUser,
        status: 'uploaded',
        fieldMappingObject: bodyData.mapObject
      }
    )

    // send success response with message
    res.send({
      type: 'success',
      message: 'Data fetched',
    })
  }
});



// Logout route as clear the cookie with token
router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token");
    // return res.send({
    //   type: 'success',
    //   message: 'logout successfully....',
    //   code: 200
    // })

    // send success response 
    return res.json({ status: "success", code: 200 });
  }
  catch (error) {
    console.log(error);
    // display error as type - error with message
    return res.json({
      status: "error",
      code: 404,
      message: "Something went wrong...",
    });
  }
});




// Export csv data
router.post('/', async function (req, res, next) {
  console.log('Export route ======');
  // console.log(JSON.stringify(req.body));

  // get the all records of userModel as modeldata
  let modeldata = await userModel.find();
  console.log('Modeldata in export');
  // console.log(modeldata);

  // fields array for set name, email, contact with label name as fields
  const fields = [
    { label: 'Name', value: 'name' },
    { label: 'Email', value: 'email' },
    { label: 'Contact', value: 'contact' },
  ];

  // create json2csvparser object for parse the fields
  const json2csvparser = new Parser({ fields });

  // parse the modeldata using .parse method as csv
  const csv = json2csvparser.parse(modeldata);

  console.log('CSV data.......');
  console.log(csv);

  // write the file in specific folder with date time
  let fileName = "users-" + moment().format("DD-MMM-YYYY-hh-mm") + ".csv";
  fs.writeFileSync('public/csvdata/' + fileName, csv)

  // send the success response with fileName
  return res.send({
    type: 'success',
    fileName: fileName
  })
});




// add new field in selectbox
router.post('/fieldData', AuthJWT, async function (req, res, next) {
  try {
    console.log('Field data...', req.body.newField);
    let fieldValue = {
      fieldVal: req.body.newField
    }
    
    let isExist = await fieldModel.findOne({fieldVal: req.body.newField})
    
     if(isExist){
       return res.json({type  :"error", message : "field Already exists"})
     }

    console.log(fieldValue);
    let data = await fieldModel(fieldValue).save();
    console.log('data', data);
    res.send({
      type: 'success',
      message: 'field saved...'
    })
  }
  catch (err) {
    res.send({
      type: 'error',
      message: 'Something went wrong..'
    })
  }
});





module.exports = router;
