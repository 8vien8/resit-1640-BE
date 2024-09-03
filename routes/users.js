const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

// @route GET /api/users
router.get('/', usersController.getUsers);

// @route GET /api/users/:id
router.get('/:id', usersController.getUserById);

// @route POST /api/users
router.post('/', usersController.createUser);

// @route PUT /api/users/:id
router.put('/:id', usersController.updateUser);

// @route DELETE /api/users/:id
router.delete('/:id', usersController.deleteUser);

module.exports = router;
