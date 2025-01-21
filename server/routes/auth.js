const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController')
const { forwardAuthenticated } = require('../middleware/auth');

router.get('/login', forwardAuthenticated, AuthController.get_login);
router.post('/login', AuthController.post_login);
router.get('/register', forwardAuthenticated, AuthController.get_register);
router.post('/register', AuthController.post_register);
router.get('/logout', AuthController.logout);

module.exports = router;
