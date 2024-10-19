const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statistics');
const authMiddleware = require('../middleware/auth');


router.get('/', authMiddleware, statisticsController.getStatistics);

router.get('/:id', authMiddleware, statisticsController.getStatisticsById);

router.post('/', authMiddleware, statisticsController.createStatistics);

router.put('/:id', authMiddleware, statisticsController.updateStatistics);

router.delete('/:id', authMiddleware, statisticsController.deleteStatistics);

module.exports = router;
