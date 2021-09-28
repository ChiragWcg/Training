var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userschema = new Schema({
    name: String,
    contact: Number,
    email: String,
    password: String,
    gender: String
});

module.exports = mongoose.model('users', userschema);