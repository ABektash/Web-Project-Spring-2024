const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');

router.get('/', LoginController.getLogin);
router.post('/', LoginController.postLogin);

module.exports = router;