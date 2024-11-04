const Contribution = require('../models/contributions');

exports.getContributions = async (req, res) => {
    try {
        const contributions = await Contribution.find()
            .populate('userID', 'username avatar email')
            .populate('facultyID')
            .populate('statusID')
            .populate('topicID')
        res.json(contributions);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getContributionById = async (req, res) => {
    try {
        const contribution = await Contribution.findById(req.params.id)
            .populate('userID', 'username avatar email')
            .populate('facultyID')
            .populate('statusID')
            .populate('topicID')

        if (!contribution) return res.status(404).send('Contribution not found');
        res.json(contribution);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.createContribution = async (req, res) => {
    try {
        const { userID, facultyID, topicID, title, content, files, submissionDate, statusID, agreedToTnC } = req.body;
        const newContribution = new Contribution({
            userID,
            facultyID,
            topicID,
            title,
            content,
            files,
            submissionDate,
            statusID,
            agreedToTnC,
        });
        await newContribution.save();
        res.json(newContribution);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateContribution = async (req, res) => {
    try {
        const { userID, facultyID, topicID, title, content, submissionDate, statusID, agreedToTnC } = req.body;

        const updatedContribution = await Contribution.findByIdAndUpdate(
            req.params.id,
            {
                userID,
                facultyID,
                topicID,
                title,
                content,
                submissionDate,
                statusID,
                agreedToTnC,
            },
            { new: true }
        )
            .populate('userID', 'username avatar email')
            .populate('facultyID')
            .populate('statusID')
            .populate('topicID')
            .lean();

        if (!updatedContribution) return res.status(404).send('Contribution not found');

        if (updatedContribution.userID) {
            updatedContribution.userID = {
                id: updatedContribution.userID._id,
                username: updatedContribution.userID.username,
                avatar: updatedContribution.userID.avatar,
                email: updatedContribution.userID.email
            };
        }

        res.json(updatedContribution);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteContribution = async (req, res) => {
    try {
        const contribution = await Contribution.findByIdAndDelete(req.params.id);
        if (!contribution) return res.status(404).send('Contribution not found');
        res.json({ message: 'Contribution deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getContributionsByTopicId = async (req, res) => {
    try {
        const { topicId } = req.params;
        const contributions = await Contribution.find({ topicID: topicId })
            .populate('userID', 'username avatar email')
            .populate('facultyID')
            .populate('statusID')
            .populate('topicID')
        res.json(contributions);
    } catch (err) {
        console.error('Error fetching contributions by topic:', err.message);
        res.status(500).send('Server Error');
    }
};