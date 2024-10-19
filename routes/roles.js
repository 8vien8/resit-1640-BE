const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roles');
const authMiddleware = require('../middleware/auth');


router.get('/', authMiddleware, roleController.getRoles);

router.get('/:id', authMiddleware, roleController.getRoleById);

router.post('/', authMiddleware, roleController.createRole);

router.put('/:id', authMiddleware, roleController.updateRole);

router.delete('/:id', authMiddleware, roleController.deleteRole);

module.exports = router;
