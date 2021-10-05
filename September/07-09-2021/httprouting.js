var http = require('http');

http.createServer(function (req, res) {
    if (req.url == "/about") {
        res.end('Welcome in the about page...');
    }
    else if (req.url == '/contact') {
        res.end('Welcome in the contact page...');
    }
    else if (req.url == '/services') {
        res.end('Welcome in the services page...');
    }
    else {
        res.end('Welcome in the home page');
    }
}).listen(4050);

console.log('Server running on http://127.0.0.1:4050');