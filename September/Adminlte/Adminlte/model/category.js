const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name: String

})

module.exports = mongoose.model('category', adminSchema);