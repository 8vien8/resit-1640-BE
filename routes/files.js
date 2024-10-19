const express = require('express');
const router = express.Router();
const fileController = require('../controllers/files');
const authMiddleware = require('../middleware/auth');


router.get('/', authMiddleware, fileController.getFiles);

router.get('/:id', authMiddleware, fileController.getFileById);

router.post('/', authMiddleware, fileController.createFile);

router.put('/:id', authMiddleware, fileController.updateFile);

router.delete('/:id', authMiddleware, fileController.deleteFile);

module.exports = router;