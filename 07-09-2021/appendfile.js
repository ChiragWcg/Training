var http = require('http');

var fs = require('fs');

fs.appendFile('newfile.txt','Welcome there...This is new text file.', function(err){
    if(err) throw err;
    console.log('File Saved');
})