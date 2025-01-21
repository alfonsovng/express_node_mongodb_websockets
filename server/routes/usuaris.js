const express = require('express');
const router = express.Router();
const UsuarisController = require('../controllers/usuarisController');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/', ensureAuthenticated, UsuarisController.list);

module.exports = router;
