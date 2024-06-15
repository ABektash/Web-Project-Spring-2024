const express = require('express');
const router = express.Router();
const RetroShopController = require('../controllers/RetroShopController');

router.get('/', RetroShopController.getRetroShopPage);

module.exports = router;
