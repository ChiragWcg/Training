const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    contact: { type: String },
    password: { type: String }
})

module.exports = mongoose.model('userAuth', userSchema);