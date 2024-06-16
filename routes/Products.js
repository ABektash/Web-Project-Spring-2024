const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/',productsController.getProductsPage );
router.post('/',productsController.postProductPage);

module.exports = router;