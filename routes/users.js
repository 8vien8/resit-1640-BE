const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const upload = require('../config/multer')

// @route GET /api/users
router.get('/', usersController.getUsers);

// @route GET /api/users/:id
router.get('/:id', usersController.getUserById);

// @route POST /api/users
router.post('/', upload, usersController.createUser);

// @route PUT /api/users/:id
router.put('/:id', upload, usersController.updateUser);

// @route DELETE /api/users/:id
router.delete('/:id', usersController.deleteUser);

module.exports = router;
