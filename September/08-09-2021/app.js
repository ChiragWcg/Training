var http = require('http');

http.createServer(function (req, res) {
    res.end('Welcome in the nodejs')
}).listen(4050);

console.log('Server running on http://127.0.0.1:4050');