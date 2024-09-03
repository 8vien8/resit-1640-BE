const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statistics');

// @route GET /api/statistics
// @desc Get all statistics
router.get('/', statisticsController.getStatistics);

// @route GET /api/statistics/:id
// @desc Get a single statistics by ID
router.get('/:id', statisticsController.getStatisticsById);

// @route POST /api/statistics
// @desc Create a new statistics
router.post('/', statisticsController.createStatistics);

// @route PUT /api/statistics/:id
// @desc Update statistics by ID
router.put('/:id', statisticsController.updateStatistics);

// @route DELETE /api/statistics/:id
// @desc Delete statistics by ID
router.delete('/:id', statisticsController.deleteStatistics);

module.exports = router;
