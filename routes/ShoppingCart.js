const express = require('express');
const router = express.Router();
const ShoppingCartController = require('../controllers/ShoppingCartController');

router.get('/', ShoppingCartController.getShoppingCartPage);
router.delete('/remove/:id', ShoppingCartController.deleteCartProduct);
router.post('/updateQuantity', ShoppingCartController.updateQuantity);

module.exports = router;
