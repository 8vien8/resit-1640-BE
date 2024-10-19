const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/faculties');
const authMiddleware = require('../middleware/auth');


router.get('/', authMiddleware, facultyController.getFaculties);

router.get('/:id', authMiddleware, facultyController.getFacultyById);

router.post('/', authMiddleware, facultyController.createFaculty);

router.put('/:id', authMiddleware, facultyController.updateFaculty);

router.delete('/:id', authMiddleware, facultyController.deleteFaculty);

module.exports = router;
