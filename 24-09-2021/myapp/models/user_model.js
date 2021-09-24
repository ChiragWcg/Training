var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    name : String,
    email : String,
    contact : Number
});

module.exports = mongoose.model('index',myschema);