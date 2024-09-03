const mongoose = require('mongoose');

const StatisticsSchema = new mongoose.Schema({
    facultyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
    },
    contributionCount: {
        type: Number,
        required: true,
        default: 0,
    },
    lastUpdated: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, { collection: 'statistics' });

module.exports = mongoose.model('Statistics', StatisticsSchema);
