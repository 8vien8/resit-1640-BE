const mongoose = require('mongoose');

const PublicContributionSchema = new mongoose.Schema({
    contributionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contribution',
        required: true,
    },
    publishedDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Public_Contribution', PublicContributionSchema);