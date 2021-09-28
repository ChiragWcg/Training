var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myschema = new Schema({
    name: String,
    email: String,
    contact: Number,
    gender: String,
    dob: String,
    password: String,
    isadmin: Boolean,
    joindate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('users',myschema);