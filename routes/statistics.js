const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statistics');
const authMiddleware = require('../middleware/auth');


router.get('/',  statisticsController.getStatistics);

router.get('/:id',  statisticsController.getStatisticsById);

router.post('/',  statisticsController.createStatistics);

router.put('/:id',  statisticsController.updateStatistics);

router.delete('/:id',  statisticsController.deleteStatistics);

module.exports = router;
