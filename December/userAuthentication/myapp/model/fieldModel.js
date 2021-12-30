const mongoose = require('mongoose')

const fieldSchema = mongoose.Schema({
    fieldVal: String
})

module.exports = mongoose.model('field', fieldSchema);