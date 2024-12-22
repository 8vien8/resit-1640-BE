const Faculty = require('../models/faculties');
const User = require('../models/users');

exports.getFaculties = async (req, res) => {
    try {
        const faculties = await Faculty.find();
        res.json(faculties);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getFacultyById = async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id);
        if (!faculty) return res.status(404).send('Faculty not found');
        res.json(faculty);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.createFaculty = async (req, res) => {
    try {
        const { facultyName } = req.body;
        const newFaculty = new Faculty({ facultyName });
        await newFaculty.save();
        res.status(201).json(newFaculty);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Faculty name already exists. Please use a unique name.' });
        }
        res.status(500).send('Server Error');
    }
};

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

exports.deleteFaculty = async (req, res) => {
    try {
        const facultyID = req.params.id;

        const memberCount = await User.countDocuments({ facultyID });
        if (memberCount > 0) {
            return res.status(400).json({
                message: `Cannot delete faculty. There are ${memberCount} member assigned to this faculty.`,
            });
        }

        const faculty = await Faculty.findByIdAndDelete(facultyID);
        if (!faculty) {
            return res.status(404).send('Faculty not found');
        }

        res.json({ message: 'Faculty deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
