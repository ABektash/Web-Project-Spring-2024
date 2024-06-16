const express = require('express');
const router = express.Router();
const manageUsersController = require('../controllers/manageUsersController');

router.get('/',manageUsersController.getManageUsersPage);

module.exports = router;
