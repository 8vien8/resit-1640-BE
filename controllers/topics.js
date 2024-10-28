const Topic = require('../models/topics');
const Contribution = require('../models/contributions');

// Get all topics, optionally filtered by facultyID
exports.getTopics = async (req, res) => {
    try {
        const { facultyID } = req.query;
        const query = facultyID ? { facultyID } : {};
        const topics = await Topic.find(query).populate('facultyID');
        res.json(topics);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error: Unable to retrieve topics' });
    }
};

// Get a single topic by ID, including its contributions
exports.getTopicById = async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id)
            .populate('facultyID')
            .populate('contributions');
        if (!topic) return res.status(404).json({ error: 'Topic not found' });
        res.json(topic);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error: Unable to retrieve topic' });
    }
};

// Create a new topic
exports.createTopic = async (req, res) => {
    try {
        const { facultyID, topicName, releaseDate, endDate } = req.body;
        const newTopic = new Topic({ facultyID, topicName, releaseDate, endDate });
        await newTopic.save();
        res.status(201).json(newTopic);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error: Unable to create topic' });
    }
};

// Update an existing topic
exports.updateTopic = async (req, res) => {
    try {
        const { topicName, releaseDate, endDate } = req.body;
        const updatedTopic = await Topic.findByIdAndUpdate(
            req.params.id,
            { topicName, releaseDate, endDate },
            { new: true }
        ).populate('facultyID');
        if (!updatedTopic) return res.status(404).json({ error: 'Topic not found' });
        res.json(updatedTopic);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error: Unable to update topic' });
    }
};

// Delete a topic and optionally handle related contributions
exports.deleteTopic = async (req, res) => {
    try {
        const topic = await Topic.findByIdAndDelete(req.params.id);
        if (!topic) return res.status(404).json({ error: 'Topic not found' });

        // Optional: Delete or unlink contributions related to this topic
        await Contribution.updateMany(
            { topicID: req.params.id },
            { $unset: { topicID: '' } } // Or delete contributions if needed
        );

        res.json({ message: 'Topic and associated contributions updated' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error: Unable to delete topic' });
    }
};
