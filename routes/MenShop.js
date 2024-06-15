const express = require('express');
const router = express.Router();
const MenShopController = require('../controllers/MenShopController');

router.get('/', MenShopController.getMenShopPage);

module.exports = router;
