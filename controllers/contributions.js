const Contribution = require('../models/contributions');

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

exports.deleteContribution = async (req, res) => {
    try {
        const contribution = await Contribution.findByIdAndDelete(req.params.id);
        if (!contribution) return res.status(404).send('Contribution not found');
        res.json({ message: 'Contribution deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
