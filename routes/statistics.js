const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statistics');
const authMiddleware = require('../middleware/auth');


router.get('/', statisticsController.getStatisticsReport);

module.exports = router;
