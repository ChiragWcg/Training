let cron = require('node-cron');
let mongoose = require('mongoose');
let csv = require('csvtojson');
global.config = require('./config/config.json');

let fileModel = require('./model/fileModel');
let userModel = require('./model/userModel');

// db connection =======
mongoose
  .connect("mongodb://chirag:chirag@localhost:27017/chirag")
  .then(() => console.log("Connection Successfully"))
  .catch((error) => console.log(error))


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


cron.schedule('*/10 * * * * *', async () => {
  console.log('running a task every two second...');
  let fileData = await fileModel.find({ status: { $ne: 'uploaded' } }).lean();
  // console.log('DAta-------', fileData)  

  for (let record of fileData) {
    let flData = await fileModel.updateOne({ _id: record._id }, { status: 'inProgress' });
    console.log('File name', record.name);
    try {
      // declare  global variable - validUser, invalidUser, duplicateUser and jsonArray, finalUser as Array
      let validUser = 0;
      let invalidUser = 0;
      let duplicateUser = 0;
      let finalUser = [];
      let mapObject = record.fieldMappingObject;
      let jsonArray;
      let duplicateUserInCsv = 0;

      // find the specific record with id as result
      // // let result = await fileModel.findOne({ _id: record._id });
      // console.log('File name ---- ', record.name);

      // store csv files path in the csvFilePath variable
      let csvFilePath = './public/csvfiles/' + record.name;

      // convert csv files to json
      jsonArray = await csv({ noheader: true }).fromFile(csvFilePath);
      // console.log('jsonArray--------');

      if (jsonArray) {
        if (record.skipFirstRow) {
          jsonArray = jsonArray.slice(1);
          // var data = await fileModel.updateOne({ _id: record._id }, { skipFirstRow: "true", fieldMappingObject: record.fieldMappingObject })
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
            console.log('invalidUser --------', invalidUser);
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
          { _id: record._id },
          {
            totalRecords: jsonArray.length,
            duplicates: duplicateUser,
            discarded: invalidUser,
            totalUploaded: validUser,
            status: 'uploaded',
            fieldMappingObject: record.fieldMappingObject
          }
        )
        console.log('data fetched...');
      }
    }
    catch (error) {
      console.log('something went wrong...', error);
    }
  }

});