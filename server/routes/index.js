const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/indexController')
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/', ensureAuthenticated, IndexController.index);

module.exports = router;
