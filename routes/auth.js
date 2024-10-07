const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/me', authMiddleware, authController.getMe);

router.post('/forgot-password', authController.forgotPassword);

router.get('/reset-password/:token', authController.resetPassword);

module.exports = router;
