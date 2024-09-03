const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    contributionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contribution',
    },
    fileName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    uploadDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, { collection: 'files' });

module.exports = mongoose.model('File', FileSchema);
