const Statistics = require('../models/statistics');

exports.getStatistics = async (req, res) => {
    try {
        const statistics = await Statistics.find();
        res.json(statistics);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getStatisticsById = async (req, res) => {
    try {
        const statistics = await Statistics.findById(req.params.id);
        if (!statistics) return res.status(404).send('Statistics not found');
        res.json(statistics);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.createStatistics = async (req, res) => {
    try {
        const { data, createdDate } = req.body;
        const newStatistics = new Statistics({ data, createdDate });
        await newStatistics.save();
        res.status(201).json(newStatistics);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.updateStatistics = async (req, res) => {
    try {
        const { data, createdDate } = req.body;
        const updatedStatistics = await Statistics.findByIdAndUpdate(
            req.params.id,
            { data, createdDate },
            { new: true }
        );
        if (!updatedStatistics) return res.status(404).send('Statistics not found');
        res.json(updatedStatistics);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.deleteStatistics = async (req, res) => {
    try {
        const statistics = await Statistics.findByIdAndDelete(req.params.id);
        if (!statistics) return res.status(404).send('Statistics not found');
        res.json({ message: 'Statistics deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
