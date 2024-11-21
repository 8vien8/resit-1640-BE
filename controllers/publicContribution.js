const PublicContribution = require('../models/publicContribution');

exports.createPublicContribution = async (req, res) => {
    try {
        const { contributionID, } = req.body;

        const newPublicContribution = new PublicContribution({
            contributionID
        });

        await newPublicContribution.save();
        res.status(201).json(newPublicContribution);
    } catch (error) {
        res.status(500).json({ message: 'Error creating Public Contribution', error: error.message });
    }
};

exports.getPublicContributions = async (req, res) => {
    try {
        const publicContributions = await PublicContribution.find()
            .populate('contributionID')
        res.status(200).json(publicContributions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Public Contributions', error: error.message });
    }
};

exports.getPublicContributionById = async (req, res) => {
    try {
        const { id } = req.params;
        const publicContribution = await PublicContribution.findById(id)
            .populate('contributionID')

        if (!publicContribution) {
            return res.status(404).json({ message: 'Public Contribution not found' });
        }

        res.status(200).json(publicContribution);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving Public Contribution', error: error.message });
    }
};

exports.updatePublicContribution = async (req, res) => {
    try {
        const { id } = req.params;
        const { contributionID } = req.body;

        const updatedPublicContribution = await PublicContribution.findByIdAndUpdate(
            id,
            { contributionID },
            { new: true }
        );

        if (!updatedPublicContribution) {
            return res.status(404).json({ message: 'Public Contribution not found' });
        }

        res.status(200).json(updatedPublicContribution);
    } catch (error) {
        res.status(500).json({ message: 'Error updating Public Contribution', error: error.message });
    }
};

exports.deletePublicContribution = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPublicContribution = await PublicContribution.findByIdAndDelete(id);

        if (!deletedPublicContribution) {
            return res.status(404).json({ message: 'Public Contribution not found' });
        }

        res.status(200).json({ message: 'Public Contribution deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Public Contribution', error: error.message });
    }
};
