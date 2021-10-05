var fs = require('fs');

fs.unlink('demo2.txt', function (err) {
    if (err) throw err;
    console.log('File deleted successfully...!');
});