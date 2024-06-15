const express = require('express');
const router = express.Router();
const singleProductController = require('../controllers/singleProductController');

router.get('/', singleProductController.getSingleProductPage);

module.exports = router;
