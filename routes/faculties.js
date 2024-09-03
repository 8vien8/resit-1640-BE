const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/faculties');

// @route GET /api/faculties
// @desc Get all faculties
router.get('/', facultyController.getFaculties);

// @route GET /api/faculties/:id
// @desc Get a single faculty by ID
router.get('/:id', facultyController.getFacultyById);

// @route POST /api/faculties
// @desc Create a new faculty
router.post('/', facultyController.createFaculty);

// @route PUT /api/faculties/:id
// @desc Update a faculty by ID
router.put('/:id', facultyController.updateFaculty);

// @route DELETE /api/faculties/:id
// @desc Delete a faculty by ID
router.delete('/:id', facultyController.deleteFaculty);

module.exports = router;
