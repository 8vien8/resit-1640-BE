const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments');
const authMiddleware = require('../middleware/auth');

router.get('/',  commentController.getComments);

router.get('/:id',  commentController.getCommentById);

router.post('/',  commentController.createComment);

router.put('/:id',  commentController.updateComment);

router.delete('/:id',  commentController.deleteComment);

module.exports = router;
