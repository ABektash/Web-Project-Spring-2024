const express = require('express');
const router = express.Router();
const addTicketController = require('../controllers/addTicketController');

router.get('/', addTicketController.getAddTicketPage);
router.post('/', addTicketController.postAddTicketPage);

module.exports = router;