const express = require('express');
const router = express.Router();
const UsuariController = require('../controllers/usuariController');

router.get('/', UsuariController.list);

module.exports = router;
