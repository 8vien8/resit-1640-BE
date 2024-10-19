const express = require('express');
const router = express.Router();
const contributionStatusController = require('../controllers/contributionStatus');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, contributionStatusController.getContributionStatuses);

router.get('/:id', authMiddleware, contributionStatusController.getContributionStatusById);

router.post('/', authMiddleware, contributionStatusController.createContributionStatus);

router.put('/:id', authMiddleware, contributionStatusController.updateContributionStatus);

router.delete('/:id', authMiddleware, contributionStatusController.deleteContributionStatus);

module.exports = router;
