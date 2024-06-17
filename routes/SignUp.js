const express = require('express');
const router = express.Router();
const SignUpController = require('../controllers/SignUpController');

router.get('/', SignUpController.getSignUp);
router.post('/', SignUpController.postSignUp);

module.exports = router;