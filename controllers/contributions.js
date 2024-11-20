const Contribution = require('../models/contributions');
const transporter = require('../config/nodemailer');
const User = require('../models/users');
const Topic = require('../models/topics');
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
        const { userID, facultyID, topicID, title, content, agreedToTnC } = req.body;

        const files = req.files ? req.files.map(file => ({
            fileName: file.originalname,
            filePath: `${req.protocol}://${req.get('host')}/uploads/contribution/${file.filename}`, // URL có thể truy cập
            fileType: file.mimetype,
        })) : [];

        const submissionDate = Date.now();

        const newContribution = new Contribution({
            userID,
            facultyID,
            topicID,
            title,
            content,
            files,
            submissionDate,
            agreedToTnC,
        });

        await newContribution.save();

        const user = await User.findById(userID);
        const username = user ? user.username : 'Unknown User';

        const topic = await Topic.findById(topicID);
        const topicName = topic ? topic.topicName : 'Unknown Topic';

        const coordinators = await User.find({ roleID: '64f000000000000000000013', facultyID: facultyID });
        const mailPromises = coordinators.map(coordinator =>
            transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: coordinator.email,
                subject: 'New Contribution Created',
                text: `A new contribution has been submitted:\n\n
                Title: ${title}\n
                Submitted by: ${username}\n
                Topic: ${topicName}\n
                Submission Date: ${new Date(submissionDate).toLocaleString()}\n\n
                Please review it.`,
            })
        );
        await Promise.all(mailPromises);

        res.status(201).json(newContribution);
    } catch (err) {
        console.error('Error creating contribution:', err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateContribution = async (req, res) => {
    try {
        const { userID, facultyID, topicID, title, content, statusID, comments, agreedToTnC } = req.body;

        const files = req.files ? req.files.map(file => ({
            fileName: file.originalname,
            filePath: `${req.protocol}://${req.get('host')}/uploads/contribution/${file.filename}`,
            fileType: file.mimetype,
        })) : [];

        const submissionDate = Date.now();

        const updatedContribution = await Contribution.findByIdAndUpdate(
            req.params.id,
            {
                userID,
                facultyID,
                topicID,
                title,
                content,
                files,
                submissionDate,
                statusID,
                agreedToTnC,
                comments
            },
            { new: true }
        );

        if (!updatedContribution) return res.status(404).send('Contribution not found');

        const user = await User.findById(userID);
        const username = user ? user.username : 'Unknown User';

        const topic = await User.findById(topicID);
        const topicName = topic ? topic.topicName : 'Unknown Topic';

        const coordinators = await User.find({ roleID: '64f000000000000000000013', facultyID });

        const mailPromises = coordinators.map(coordinator =>
            transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: coordinator.email,
                subject: 'Contribution Updated',
                text: `A contribution has been updated:\n\n
                Title: ${title}\n
                Updated by: ${username}\n
                Topic: ${topicName}\n
                Update Date: ${new Date(submissionDate).toLocaleString()}\n\nPlease review the updates.`,
            })
        );

        await Promise.all(mailPromises);
        res.json(updatedContribution);
    } catch (err) {
        console.error('Error updating contribution:', err.message);
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

exports.getContributionForStudent = async (req, res) => {
    try {
        const { userId, facultyId, topicId } = req.params;

        if (!userId || !facultyId || !topicId) {
            return res.status(400).json({ message: 'userID and topicID are required.' });
        }
        const contributions = await Contribution.find({ userID: userId, facultyID: facultyId, topicID: topicId }).populate('statusID');

        if (!contributions) {
            return res.status(404).json({ message: 'No contributions found for the provided userID and topicID.' });
        }
        console.log(userId, topicId, facultyId)

        res.json(contributions);
    } catch (err) {
        console.error('Error fetching contributions for student:', err.message);
        res.status(500).send('Server Error');
    }
}