var fs = require('fs');

fs.writeFile('newfile.txt','File content changed', function (err) {
    if (err) throw err;
    console.log('File written...');
})