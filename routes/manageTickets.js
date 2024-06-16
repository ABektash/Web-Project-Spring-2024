const express = require('express');
const router = express.Router();
const manageTicketsController = require('../controllers/manageTicketsController');

router.get('/',manageTicketsController.getManageTicketsPage);

module.exports = router;
