const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/systemSettings');
const authMiddleware = require('../middleware/auth');


router.get('/',  settingsController.getSettings);

router.get('/:id',  settingsController.getSettingById);

router.post('/',  settingsController.createSetting);

router.put('/:id',  settingsController.updateSetting);

router.delete('/:id',  settingsController.deleteSetting);

module.exports = router;
