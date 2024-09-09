const ContributionStatus = require('../models/contributionsStatus');

exports.getContributionStatuses = async (req, res) => {
    try {
        const statuses = await ContributionStatus.find();
        res.json(statuses);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getContributionStatusById = async (req, res) => {
    try {
        const status = await ContributionStatus.findById(req.params.id);
        if (!status) return res.status(404).send('Contribution Status not found');
        res.json(status);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.createContributionStatus = async (req, res) => {
    try {
        const { statusName } = req.body;
        const newStatus = new ContributionStatus({ statusName });
        await newStatus.save();
        res.status(201).json(newStatus);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};


exports.updateContributionStatus = async (req, res) => {
    try {
        const { statusName } = req.body;
        const updatedStatus = await ContributionStatus.findByIdAndUpdate(
            req.params.id,
            { statusName },
            { new: true }
        );
        if (!updatedStatus) return res.status(404).send('Contribution Status not found');
        res.json(updatedStatus);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.deleteContributionStatus = async (req, res) => {
    try {
        const status = await ContributionStatus.findByIdAndDelete(req.params.id);
        if (!status) return res.status(404).send('Contribution Status not found');
        res.json({ message: 'Contribution Status deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
