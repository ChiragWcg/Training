// parse() Example 
var querystring = require('querystring');
var obj = querystring.parse('name=Chirag&state=Gujarat&country=India');
console.log(obj);


// stringify() Example  
var querystring = require('querystring');
var data = querystring.stringify({ name: 'chirag', country: 'India' });
console.log(data);