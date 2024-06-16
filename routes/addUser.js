const express = require('express');
const router = express.Router();
const addUserController = require('../controllers/addUserController');

router.get('/', addUserController.getAddUserPage);
router.post('/', addUserController.postAddUserPage);

module.exports = router;