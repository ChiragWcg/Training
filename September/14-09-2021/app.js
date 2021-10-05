var express = require('express');
var app = express()
var port = 3000

app.get('/', (req, res) => {
    res.send('Welcome in the Express JS');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    // console.log('Server running on http://127.0.0.1:3000');
});