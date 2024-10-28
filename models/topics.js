const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema({
    facultyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Faculty',
        required: true
    },
    contribution: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Contribution'
        },
    ],
    topicName: {
        type: String,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    endDate: {
        type: Date,
        required: true
    }
}, { collection: 'topics' });

module.exports = mongoose.model('Topic', TopicSchema);