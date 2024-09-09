const Setting = require('../models/systemSettings');

exports.getSettings = async (req, res) => {
    try {
        const settings = await Setting.find();
        res.json(settings);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getSettingById = async (req, res) => {
    try {
        const setting = await Setting.findById(req.params.id);
        if (!setting) return res.status(404).send('Setting not found');
        res.json(setting);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.createSetting = async (req, res) => {
    try {
        const { settingName, settingValue } = req.body;
        const newSetting = new Setting({ settingName, settingValue });
        await newSetting.save();
        res.status(201).json(newSetting);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.updateSetting = async (req, res) => {
    try {
        const { settingName, settingValue } = req.body;
        const updatedSetting = await Setting.findByIdAndUpdate(
            req.params.id,
            { settingName, settingValue },
            { new: true }
        );
        if (!updatedSetting) return res.status(404).send('Setting not found');
        res.json(updatedSetting);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.deleteSetting = async (req, res) => {
    try {
        const setting = await Setting.findByIdAndDelete(req.params.id);
        if (!setting) return res.status(404).send('Setting not found');
        res.json({ message: 'Setting deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
