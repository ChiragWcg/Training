let converter = require('json-2-csv');
let fs = require('fs');

let jsonArray = JSON.parse(fs.readFileSync('csvResult.json'));

converter.json2csv(jsonArray, (err, csv) => {
    if(err){
        throw err;
    }
    console.log(csv);
    fs.writeFileSync('jsonResult.csv', csv)
})
