var fs = require('fs');

fs.rename('demo.txt', 'demo2.txt', function (err) {
    if (err) throw err;
    console.log('File renamed successfully...!');
});