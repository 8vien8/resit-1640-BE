const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comments');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, commentController.getComments);

router.get('/:id', authMiddleware, commentController.getCommentById);

router.post('/', authMiddleware, commentController.createComment);

router.put('/:id', authMiddleware, commentController.updateComment);

router.delete('/:id', authMiddleware, commentController.deleteComment);

module.exports = router;
