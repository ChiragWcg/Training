const mongoose = require('mongoose')

const fileSchema = mongoose.Schema({
    name: {
        type: String
    },
    fieldMappingObject: {
        type: mongoose.Mixed,
        default: null
    },
    totalRecords: {
        type: Number,
        default: 0
    },
    skipFirstRow: {
        type: Boolean,
        default: false
    },
    duplicates: {
        type: Number,
        default: 0
    },
    discarded: {
        type: Number,
        default: 0
    },
    totalUploaded: {
        type: Number,
        default: 0
    },
    uploadedBy: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'inProgress', 'uploaded'],
        default: 'pending'
    }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('csvData', fileSchema);