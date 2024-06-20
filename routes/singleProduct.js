const express = require('express');
const router = express.Router();
const singleProductController = require('../controllers/singleProductController');

router.get('/women/:id', singleProductController.getSingleProductWomen);
router.get('/men/:id', singleProductController.getSingleProductMen);
router.get('/retro/:id', singleProductController.getSingleProductRetro);
router.get('/add/:name/:size/:quantity', singleProductController.getSingleProductCart);

module.exports = router;
