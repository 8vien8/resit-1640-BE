const express = require('express');
const router = express.Router();
const contributionController = require('../controllers/contributions');

// @route GET /api/contributions
// @desc Get all contributions
router.get('/', contributionController.getContributions);

// @route GET /api/contributions/:id
// @desc Get a single contribution by ID
router.get('/:id', contributionController.getContributionById);

// @route POST /api/contributions
// @desc Create a new contribution
router.post('/', contributionController.createContribution);

// @route PUT /api/contributions/:id
// @desc Update a contribution by ID
router.put('/:id', contributionController.updateContribution);

// @route DELETE /api/contributions/:id
// @desc Delete a contribution by ID
router.delete('/:id', contributionController.deleteContribution);

module.exports = router;
