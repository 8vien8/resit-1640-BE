const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const upload = require('../config/multer');
const authMiddleware = require('../middleware/auth');


router.get('/', authMiddleware, usersController.getUsers);

router.get('/:id', authMiddleware, usersController.getUserById);

router.post('/', authMiddleware, upload, usersController.createUser);

router.put('/:id', authMiddleware, upload, usersController.updateUser);

router.delete('/:id', authMiddleware, usersController.deleteUser);

router.get('/role/:roleID', authMiddleware, usersController.getUsersByRole);

router.get('/faculty/:facultyID', authMiddleware, usersController.getUsersByFaculty);

module.exports = router;
