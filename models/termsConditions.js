const mongoose = require('mongoose');

const TermsAndConditionsSchema = new mongoose.Schema({
    tnCText: {
        type: String,
        required: true,
    },
    versionDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, { collection: 'termsAndConditions' });

module.exports = mongoose.model('Terms_And_Conditions', TermsAndConditionsSchema);
