var http = require('http');

var fs = require('fs');

fs.unlink('newfile2.txt', function (err) {
    if (err) throw err;
    console.log('File deleted...');
})