const express = require('express');
const router = express.Router();
const manageTicketsController = require('../controllers/manageTicketsController');
const editTicketsController = require('../controllers/editTicketController');

router.get('/',manageTicketsController.getManageTicketsPage);
router.get('/edit/:id', manageTicketsController.getEditTicketPage);
router.post('/edit/:id', editTicketsController.postEditTicketPage);

module.exports = router;
