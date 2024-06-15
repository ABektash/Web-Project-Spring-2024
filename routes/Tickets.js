const express = require('express');
const router = express.Router();
const TicketsController = require('../controllers/TicketsController');

router.get('/', TicketsController.getTicketsPage);

module.exports = router;
