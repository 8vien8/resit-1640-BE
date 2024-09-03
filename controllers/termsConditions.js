const TermsAndConditions = require('../models/termsConditions');

// @desc Get all terms and conditions
// @route GET /api/terms_and_conditions
exports.getTermsAndConditions = async (req, res) => {
    try {
        const termsAndConditions = await TermsAndConditions.find();
        res.json(termsAndConditions);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Get terms and conditions by ID
// @route GET /api/terms_and_conditions/:id
exports.getTermsAndConditionsById = async (req, res) => {
    try {
        const termsAndConditions = await TermsAndConditions.findById(req.params.id);
        if (!termsAndConditions) return res.status(404).send('Terms and Conditions not found');
        res.json(termsAndConditions);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Create a new terms and conditions
// @route POST /api/terms_and_conditions
exports.createTermsAndConditions = async (req, res) => {
    try {
        const { content, version, createdDate } = req.body;
        const newTermsAndConditions = new TermsAndConditions({ content, version, createdDate });
        await newTermsAndConditions.save();
        res.status(201).json(newTermsAndConditions);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Update terms and conditions
// @route PUT /api/terms_and_conditions/:id
exports.updateTermsAndConditions = async (req, res) => {
    try {
        const { content, version, createdDate } = req.body;
        const updatedTermsAndConditions = await TermsAndConditions.findByIdAndUpdate(
            req.params.id,
            { content, version, createdDate },
            { new: true }
        );
        if (!updatedTermsAndConditions) return res.status(404).send('Terms and Conditions not found');
        res.json(updatedTermsAndConditions);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// @desc Delete terms and conditions
// @route DELETE /api/terms_and_conditions/:id
exports.deleteTermsAndConditions = async (req, res) => {
    try {
        const termsAndConditions = await TermsAndConditions.findByIdAndDelete(req.params.id);
        if (!termsAndConditions) return res.status(404).send('Terms and Conditions not found');
        res.json({ message: 'Terms and Conditions deleted' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
