const express = require('express');
const router = express.Router();
const manageProductsController = require('../controllers/manageProductsController');

router.get('/',manageProductsController.getManageProductsPage);

module.exports = router;
