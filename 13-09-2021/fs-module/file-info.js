var fs = require('fs');

fs.stat('demo.txt', function (err, stats) {
    if (err) {
        return console.error(err);
    }    
    console.log(stats);
    // Check file type
    console.log("isFile ? " + stats.isFile());
    console.log("isDirectory ? " + stats.isDirectory());
});


// console.log(__filename);
// console.log(__dirname);