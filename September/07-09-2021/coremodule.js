var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end('<h2>Welcome in the nodeJS</h2>');
}).listen(3000);

console.log('Server running on http://127.0.0.1:3000');