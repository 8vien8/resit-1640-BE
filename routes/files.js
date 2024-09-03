const express = require('express');
const router = express.Router();
const fileController = require('../controllers/files');

// @route GET /api/files
// @desc Get all files
router.get('/', fileController.getFiles);

// @route GET /api/files/:id
// @desc Get a single file by ID
router.get('/:id', fileController.getFileById);

// @route POST /api/files
// @desc Create a new file
router.post('/', fileController.createFile);

// @route PUT /api/files/:id
// @desc Update a file by ID
router.put('/:id', fileController.updateFile);

// @route DELETE /api/files/:id
// @desc Delete a file by ID
router.delete('/:id', fileController.deleteFile);

module.exports = router;