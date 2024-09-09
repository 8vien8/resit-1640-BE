const express = require('express');
const router = express.Router();
const contributionStatusController = require('../controllers/contributionStatus');


router.get('/', contributionStatusController.getContributionStatuses);

router.get('/:id', contributionStatusController.getContributionStatusById);

router.post('/', contributionStatusController.createContributionStatus);

router.put('/:id', contributionStatusController.updateContributionStatus);

router.delete('/:id', contributionStatusController.deleteContributionStatus);

module.exports = router;
