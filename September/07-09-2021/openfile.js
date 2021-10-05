var fs = require('fs');

fs.open('newfile2.txt', 'w', function (err, data){
    if (err) throw err;
    console.log('File opened');
});