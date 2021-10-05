var fs = require('fs');

//Write without utf-8
// fs.readFile('demo.txt', function (err, data) {

fs.readFile('demo.txt', 'utf-8', function (err, data) {
    if (err) throw err;
    console.log(data);
});