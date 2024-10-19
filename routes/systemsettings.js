const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/systemSettings');
const authMiddleware = require('../middleware/auth');


router.get('/', authMiddleware, settingsController.getSettings);

router.get('/:id', authMiddleware, settingsController.getSettingById);

router.post('/', authMiddleware, settingsController.createSetting);

router.put('/:id', authMiddleware, settingsController.updateSetting);

router.delete('/:id', authMiddleware, settingsController.deleteSetting);

module.exports = router;
