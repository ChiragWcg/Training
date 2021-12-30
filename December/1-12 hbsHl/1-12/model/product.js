let mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    productName: String,
    _category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    }
    ]
})

module.exports = mongoose.model('product', productSchema, 'product');
