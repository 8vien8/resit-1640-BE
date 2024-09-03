const File = require('../models/files');

// @desc Get all files
// @route GET /api/files
exports.getFiles = async (req, res) => {
    try {
        const files = await File.find().populate('contributionID');
        res.json(files);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Get file by ID
// @route GET /api/files/:id
exports.getFileById = async (req, res) => {
    try {
        const file = await File.findById(req.params.id).populate('contributionID');
        if (!file) return res.status(404).send('File not found');
        res.json(file);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Create a new file
// @route POST /api/files
exports.createFile = async (req, res) => {
    try {
        const { contributionID, filePath, fileType, uploadDate } = req.body;
        const newFile = new File({ contributionID, filePath, fileType, uploadDate });
        await newFile.save();
        res.status(201).json(newFile);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Update a file
// @route PUT /api/files/:id
exports.updateFile = async (req, res) => {
    try {
        const { contributionID, filePath, fileType, uploadDate } = req.body;
        const updatedFile = await File.findByIdAndUpdate(
            req.params.id,
            { contributionID, filePath, fileType, uploadDate },
            { new: true }
        ).populate('contributionID');
        if (!updatedFile) return res.status(404).send('File not found');
        res.json(updatedFile);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Delete a file
// @route DELETE /api/files/:id
exports.deleteFile = async (req, res) => {
    try {
        const file = await File.findByIdAndDelete(req.params.id);
        if (!file) return res.status(404).send('File not found');
        res.json({ message: 'File deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
