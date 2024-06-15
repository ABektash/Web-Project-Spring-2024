const express = require('express');
const router = express.Router();
const WomenShopController = require('../controllers/WomenShopController');

router.get('/', WomenShopController.getWomenShopPage);

module.exports = router;
