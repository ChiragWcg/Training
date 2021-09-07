var http = require('http');

var fs = require('fs');

fs.rename('newfile.txt', 'demofile.txt', function (err) {
    if (err) throw err;
    console.log('File Renamed...');
})