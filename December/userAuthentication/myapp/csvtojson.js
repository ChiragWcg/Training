let csvToJson = require('csvtojson');
let fs = require('fs');

csvToJson().fromFile('csvDemo.csv')
    .then(csvDemo => {
        console.log(csvDemo);
        fs.writeFile('csvResult.json', JSON.stringify(csvDemo, null, 3), (err) => {
            if(err){
                throw err;
            }
            console.log('Json data....');
        })
    }).catch(err => {
        console.log('error--', err);
    })