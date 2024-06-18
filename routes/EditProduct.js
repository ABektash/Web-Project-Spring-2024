const express = require('express');
const router = express.Router();
const EditProductController = require('../controllers/EditProductController');

router.get('/', EditProductController.getEditProductPage);
router.post('/', EditProductController.postEditProductPage);

module.exports = router;