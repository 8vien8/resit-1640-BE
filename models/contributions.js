const mongoose = require('mongoose');

const ContributionSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    facultyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
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
        required: true,
        default: Date.now,
    },
    statusID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contribution_Status',
    },
    agreedToTnC: {
        type: Boolean,
        required: true,
    },
}, { collection: 'contributions' });

module.exports = mongoose.model('Contribution', ContributionSchema);
