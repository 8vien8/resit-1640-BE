const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roles');
const authMiddleware = require('../middleware/auth');


router.get('/',  roleController.getRoles);

router.get('/:id',  roleController.getRoleById);

router.post('/',  roleController.createRole);

router.put('/:id',  roleController.updateRole);

router.delete('/:id',  roleController.deleteRole);

module.exports = router;
