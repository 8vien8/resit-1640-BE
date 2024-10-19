const express = require('express');
const router = express.Router();
const contributionController = require('../controllers/contributions');
const authMiddleware = require('../middleware/auth');


router.get('/', authMiddleware, contributionController.getContributions);

router.get('/:id', authMiddleware, contributionController.getContributionById);

router.post('/', authMiddleware, contributionController.createContribution);

router.put('/:id', authMiddleware, contributionController.updateContribution);

router.delete('/:id', authMiddleware, contributionController.deleteContribution);

module.exports = router;
