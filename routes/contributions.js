const express = require('express');
const router = express.Router();
const contributionController = require('../controllers/contributions');
const { uploadContribution } = require('../config/multer')
const authMiddleware = require('../middleware/auth');


router.get('/', contributionController.getContributions);

router.get('/:id', contributionController.getContributionById);

router.get('/topic/:topicId', contributionController.getContributionsByTopicId);

router.get('/:userId/:facultyId/:topicId', contributionController.getContributionForStudent);

router.post('/', contributionController.createContribution);

router.put('/:id', contributionController.updateContribution);

router.delete('/:id', contributionController.deleteContribution);

module.exports = router;
