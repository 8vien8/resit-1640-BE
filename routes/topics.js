const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topics');

router.post('', topicController.createTopic);
router.get('', topicController.getAllTopics);
router.get('/:id', topicController.getTopicById);
router.put('/:id', topicController.updateTopic);
router.delete('/:id', topicController.deleteTopic);
router.get('/faculty/:facultyId', topicController.getTopicsByFacultyId);

module.exports = router;
