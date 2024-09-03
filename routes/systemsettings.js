const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/systemSettings');

// @route GET /api/settings
// @desc Get all settings
router.get('/', settingsController.getSettings);

// @route GET /api/settings/:id
// @desc Get a single setting by ID
router.get('/:id', settingsController.getSettingById);

// @route POST /api/settings
// @desc Create a new setting
router.post('/', settingsController.createSetting);

// @route PUT /api/settings/:id
// @desc Update a setting by ID
router.put('/:id', settingsController.updateSetting);

// @route DELETE /api/settings/:id
// @desc Delete a setting by ID
router.delete('/:id', settingsController.deleteSetting);

module.exports = router;
