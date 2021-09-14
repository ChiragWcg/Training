var express = require('express');
var app = express()
var port = 3000

app.get('/', (req, res) => {
    res.send('Welcome in the Express JS');
});

app.get('/about', (req, res) => {
    res.send('Welcome in the about page');
});

app.get('/contact', (req, res) => {
    res.send('Welcome in the contact page');
});

app.get('/services', (req, res) => {
    res.send('Welcome in the services page');
});

// app.post('/', (req, res) => {
//     res.send('Got a POST request');
// })

// app.put('/user', function (req, res) {
//     res.send('Got a PUT request at /user')
// })

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});