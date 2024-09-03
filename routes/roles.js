const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roles');

// @route GET /api/roles
// @desc Get all roles
router.get('/', roleController.getRoles);

// @route GET /api/roles/:id
// @desc Get a single role by ID
router.get('/:id', roleController.getRoleById);

// @route POST /api/roles
// @desc Create a new role
router.post('/', roleController.createRole);

// @route PUT /api/roles/:id
// @desc Update a role by ID
router.put('/:id', roleController.updateRole);

// @route DELETE /api/roles/:id
// @desc Delete a role by ID
router.delete('/:id', roleController.deleteRole);

module.exports = router;
