const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
    facultyName: {
        type: String,
        required: true,
        unique: true,
    },
}, { collection: 'faculties' });

module.exports = mongoose.model('Faculty', FacultySchema);
