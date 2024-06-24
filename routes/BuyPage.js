const express = require('express');
const router = express.Router();
const BuyPageController = require('../controllers/BuyPageController');

router.get('/', BuyPageController.getBuyPage);
router.post('/', BuyPageController.postBuyPage);
router.get('/:id', BuyPageController.getBuyPage);
router.get('/custom/:id', BuyPageController.getBuyPage);
router.post('/:id', BuyPageController.postBuyTicketPage);
router.post('/custom/:id', BuyPageController.postBuyCustomPage);

module.exports = router;