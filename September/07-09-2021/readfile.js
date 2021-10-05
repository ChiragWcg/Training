var http = require('http');

var fs = require('fs');

http.createServer(function (req, res) {
    fs.readFile('demo.html', function (err, data) {
        res.write(data);
        return res.end();
    });
}).listen(4050);

console.log('Server running on http://127.0.0.1:4050');