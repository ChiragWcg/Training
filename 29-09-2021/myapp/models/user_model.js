var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    name : String,        
    email : String,
    contact : String,
    city : String,
    state : String,
    password : String,
    photo : String,
    pname : String,
    category : String,
    details : String,
    price : Number,
    qty : Number,
});

module.exports = mongoose.model('USER',myschema);