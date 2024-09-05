const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');

// @route POST /api/auth/register
router.post('/register', authController.register);

// @route POST /api/auth/login
router.post('/login', authController.login);

// @route GET /api/auth/me
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
