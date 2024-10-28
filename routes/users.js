const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const upload = require('../config/multer');
const authMiddleware = require('../middleware/auth');


router.get('/', usersController.getUsers);

router.get('/:id', usersController.getUserById);

router.post('/', upload, usersController.createUser);

router.put('/:id', upload, usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

router.get('/role/:roleID', usersController.getUsersByRole);

router.get('/faculty/:facultyID', usersController.getUsersByFaculty);

module.exports = router;
