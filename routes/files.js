const express = require('express');
const router = express.Router();
const fileController = require('../controllers/files');
const authMiddleware = require('../middleware/auth');


router.get('/',  fileController.getFiles);

router.get('/:id',  fileController.getFileById);

router.post('/',  fileController.createFile);

router.put('/:id',  fileController.updateFile);

router.delete('/:id',  fileController.deleteFile);

module.exports = router;