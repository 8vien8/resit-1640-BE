const express = require('express');
const router = express.Router();
const contributionStatusController = require('../controllers/contributionStatus');

// @route GET /api/contribution_status
// @desc Get all contribution statuses
router.get('/', contributionStatusController.getContributionStatuses);

// @route GET /api/contribution_status/:id
// @desc Get a single contribution status by ID
router.get('/:id', contributionStatusController.getContributionStatusById);

// @route POST /api/contribution_status
// @desc Create a new contribution status
router.post('/', contributionStatusController.createContributionStatus);

// @route PUT /api/contribution_status/:id
// @desc Update a contribution status by ID
router.put('/:id', contributionStatusController.updateContributionStatus);

// @route DELETE /api/contribution_status/:id
// @desc Delete a contribution status by ID
router.delete('/:id', contributionStatusController.deleteContributionStatus);

module.exports = router;
