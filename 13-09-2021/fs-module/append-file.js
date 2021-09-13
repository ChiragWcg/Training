var fs = require('fs');

fs.appendFile('test.txt', 'This is demo test file...!', function (err) {
    if (err) throw err;
    console.log('File Content Changed...!');
});