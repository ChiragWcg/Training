const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name: String,
    email: String,
    address: String,
    password: String
})

module.exports = mongoose.model('admin', adminSchema);