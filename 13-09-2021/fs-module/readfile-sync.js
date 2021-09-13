var fs = require('fs');

var data = fs.readFileSync('demo.html');
console.log('Html File :' + data.toString());
console.log('Program end');