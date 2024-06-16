const express = require('express');
const router = express.Router();
const editTicketController = require('../controllers/editTicketController');

router.get('/', editTicketController.getEditTicketPage);
router.post('/',editTicketController.postEditTicketPage);

module.exports = router;