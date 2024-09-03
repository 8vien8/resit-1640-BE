const Comment = require('../models/comments');

// @desc Get all comments
// @route GET /api/comments
exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate('contributionID')
            .populate('userID');
        res.json(comments);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Get comment by ID
// @route GET /api/comments/:id
exports.getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
            .populate('contributionID')
            .populate('userID');
        if (!comment) return res.status(404).send('Comment not found');
        res.json(comment);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Create a new comment
// @route POST /api/comments
exports.createComment = async (req, res) => {
    try {
        const { contributionID, userID, commentText, commentDate } =
            req.body; const newComment = new Comment({ contributionID, userID, commentText, commentDate });
        await newComment.save(); res.status(201).json(newComment);
    } catch (err) { res.status(500).send('Server Error'); }
};
// @desc Update a comment // @route PUT /api/comments/
exports.updateComment = async (req, res) => {
    try {
        const { contributionID, userID, commentText, commentDate } = req.body;
        const updatedComment = await Comment.findByIdAndUpdate(req.params.id,
            { contributionID, userID, commentText, commentDate },
            { new: true }).populate('contributionID').populate('userID');
        if (!updatedComment)
            return res.status(404).send('Comment not found');
        res.json(updatedComment);
    } catch (err) { res.status(500).send('Server Error'); }
};

// @desc Delete a comment // @route DELETE /api/comments/
exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) return res.status(404).send('Comment not found');
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};