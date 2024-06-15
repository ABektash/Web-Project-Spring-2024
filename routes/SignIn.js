const express = require('express');
const router = express.Router();
const SignInController = require('../controllers/SignInController');

router.get('/', SignInController.getSignInPage);
router.post('/', SignInController.postSignIn);

module.exports = router;