const express = require('express');
const router = express.Router();
const contributionController = require('../controllers/contributions');
const authMiddleware = require('../middleware/auth');


router.get('/', contributionController.getContributions);

router.get('/:id', contributionController.getContributionById);

router.get('/topic/:topicId', contributionController.getContributionsByTopicId);

router.post('/', contributionController.createContribution);

router.put('/:id', contributionController.updateContribution);

router.delete('/:id', contributionController.deleteContribution);

module.exports = router;
