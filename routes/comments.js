const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments');

// @route GET /api/comments
// @desc Get all comments
router.get('/', commentController.getComments);

// @route GET /api/comments/:id
// @desc Get a single comment by ID
router.get('/:id', commentController.getCommentById);

// @route POST /api/comments
// @desc Create a new comment
router.post('/', commentController.createComment);

// @route PUT /api/comments/:id
// @desc Update a comment by ID
router.put('/:id', commentController.updateComment);

// @route DELETE /api/comments/:id
// @desc Delete a comment by ID
router.delete('/:id', commentController.deleteComment);

module.exports = router;
