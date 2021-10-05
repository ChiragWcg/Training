var fs = require('fs');

fs.writeFile('test.txt', 'Welcome in the demo test file...!', function(err) {
    if (err) throw err;
    console.log('File created successfully...!');
});