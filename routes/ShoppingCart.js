const express = require('express');
const router = express.Router();
const ShoppingCartController = require('../controllers/ShoppingCartController');

router.get('/', ShoppingCartController.getShoppingCartPage);

module.exports = router;
