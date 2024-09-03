const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    contributionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contribution',
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    commentText: {
        type: String,
        required: true,
    },
    commentDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, { collection: 'comments' });

module.exports = mongoose.model('Comment', CommentSchema);
