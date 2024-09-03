const mongoose = require('mongoose');

const ContributionStatusSchema = new mongoose.Schema({
    statusName: {
        type: String,
        required: true,
        unique: true,
    },
}, { collection: 'contributionsStatus' });

module.exports = mongoose.model('Contribution_Status', ContributionStatusSchema);
