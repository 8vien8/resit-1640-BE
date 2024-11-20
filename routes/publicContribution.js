const express = require('express');
const router = express.Router();
const publicContributionController = require('../controllers/publicContribution');

// Routes
router.post('/', publicContributionController.createPublicContribution);
router.get('/', publicContributionController.getPublicContributions);
router.get('/:id', publicContributionController.getPublicContributionById);
router.put('/:id', publicContributionController.updatePublicContribution);
router.delete('/:id', publicContributionController.deletePublicContribution);

module.exports = router;
