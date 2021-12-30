let mongoose = require('mongoose');

let categorySchema = mongoose.Schema({
    categoryName : String,
})

module.exports = mongoose.model('category', categorySchema, 'category');