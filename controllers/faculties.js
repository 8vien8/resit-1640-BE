const Faculty = require('../models/faculties');

// @desc Get all faculties
// @route GET /api/faculties
exports.getFaculties = async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.json(faculties);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Get faculty by ID
// @route GET /api/faculties/:id
exports.getFacultyById = async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if (!faculty) return res.status(404).send('Faculty not found');
        res.json(faculty);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Create a new faculty
// @route POST /api/faculties
exports.createFaculty = async (req, res) => {
    try {
        const { facultyName } = req.body;
        const newFaculty = new Faculty({ facultyName });
        await newFaculty.save();
        res.status(201).json(newFaculty);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Update a faculty
// @route PUT /api/faculties/:id
exports.updateFaculty = async (req, res) => {
    try {
        const { facultyName } = req.body;
        const updatedFaculty = await Faculty.findByIdAndUpdate(
            req.params.id,
            { facultyName },
            { new: true }
        );
        if (!updatedFaculty) return res.status(404).send('Faculty not found');
        res.json(updatedFaculty);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Delete a faculty
// @route DELETE /api/faculties/:id
exports.deleteFaculty = async (req, res) => {
    try {
        const faculty = await Faculty.findByIdAndDelete(req.params.id);
        if (!faculty) return res.status(404).send('Faculty not found');
        res.json({ message: 'Faculty deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
