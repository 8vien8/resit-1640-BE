const Contribution = require('../models/contributions');

// @desc Get all contributions
// @route GET /api/contributions
exports.getContributions = async (req, res) => {
    try {
        const contributions = await Contribution.find()
            .populate('userID')
            .populate('facultyID')
            .populate('statusID');
        res.json(contributions);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Get contribution by ID
// @route GET /api/contributions/:id
exports.getContributionById = async (req, res) => {
    try {
        const contribution = await Contribution.findById(req.params.id)
            .populate('userID')
            .populate('facultyID')
            .populate('statusID');
        if (!contribution) return res.status(404).send('Contribution not found');
        res.json(contribution);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Create a new contribution
// @route POST /api/contributions
exports.createContribution = async (req, res) => {
    try {
        const { userID, facultyID, title, content, submissionDate, statusID, agreedToTnC } = req.body;
        const newContribution = new Contribution({ userID, facultyID, title, content, submissionDate, statusID, agreedToTnC });
        await newContribution.save();
        res.status(201).json(newContribution);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Update a contribution
// @route PUT /api/contributions/:id
exports.updateContribution = async (req, res) => {
    try {
        const { userID, facultyID, title, content, submissionDate, statusID, agreedToTnC } = req.body;
        const updatedContribution = await Contribution.findByIdAndUpdate(
            req.params.id,
            { userID, facultyID, title, content, submissionDate, statusID, agreedToTnC },
            { new: true }
        ).populate('userID')
            .populate('facultyID')
            .populate('statusID');
        if (!updatedContribution) return res.status(404).send('Contribution not found');
        res.json(updatedContribution);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Delete a contribution
// @route DELETE /api/contributions/:id
exports.deleteContribution = async (req, res) => {
    try {
        const contribution = await Contribution.findByIdAndDelete(req.params.id);
        if (!contribution) return res.status(404).send('Contribution not found');
        res.json({ message: 'Contribution deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
