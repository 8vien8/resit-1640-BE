const Topic = require('../models/topics');

exports.createTopic = async (req, res) => {
    try {
        const { faculty, topicName, releaseDate, endDate } = req.body;
        const topic = new Topic({ faculty, topicName, releaseDate, endDate });
        const savedTopic = await topic.save();
        res.status(201).json(savedTopic);
    } catch (error) {
        res.status(500).json({ message: 'Error creating topic', error });
    }
};

exports.getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.find().populate('faculty');
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving topics', error });
    }
};

exports.getTopicById = async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id).populate('faculty');
        if (!topic) return res.status(404).json({ message: 'Topic not found' });
        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving topic', error });
    }
};

exports.updateTopic = async (req, res) => {
    try {
        const { faculty, topicName, releaseDate, endDate } = req.body;
        const topic = await Topic.findByIdAndUpdate(
            req.params.id,
            { faculty, topicName, releaseDate, endDate },
            { new: true, runValidators: true }
        ).populate('faculty');

        if (!topic) return res.status(404).json({ message: 'Topic not found' });
        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json({ message: 'Error updating topic', error });
    }
};

exports.deleteTopic = async (req, res) => {
    try {
        const topic = await Topic.findByIdAndDelete(req.params.id);
        if (!topic) return res.status(404).json({ message: 'Topic not found' });
        res.status(200).json({ message: 'Topic deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting topic', error });
    }
};

exports.getTopicsByFacultyId = async (req, res) => {
    try {
        const { facultyId } = req.params;
        const topics = await Topic.find({ faculty: facultyId }).populate('faculty');
        if (topics.length === 0) {
            return res.json(topics);
        }
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving topics', error: error.message });
    }
};
