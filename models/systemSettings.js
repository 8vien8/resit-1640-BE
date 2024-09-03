const mongoose = require('mongoose');

const SystemSettingsSchema = new mongoose.Schema({
    settingName: {
        type: String,
        required: true,
        unique: true,
    },
    settingValue: {
        type: String,
        required: true,
    },
}, { collection: 'SystemSettings' });

module.exports = mongoose.model('System_Settings', SystemSettingsSchema);
