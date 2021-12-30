const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    gender: { type: String },
    hobbies: [{ type: String }],
    imagefile: { type: String },
    interest: { type: String },
})

module.exports = mongoose.model('ajaxdemo', adminSchema);