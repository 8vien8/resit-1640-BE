const mongoose = require('mongoose');

const ContributionSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    facultyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true,
    },

    topicID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
    },

    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    submissionDate: {
        type: Date,
        default: Date.now,
    },
    statusID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contribution_Status',
        default: '64f000000000000000000041',
    },
    agreedToTnC: {
        type: Boolean,
        required: true,
    },
    files: [
        {
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
            }
        },
    ],
    comments: {
        type: String,
        default: 'Wait for Feedback ',
    },

}, { collection: 'contributions' });

module.exports = mongoose.model('Contribution', ContributionSchema);
