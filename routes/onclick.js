
const express = require('express');
const router = express.Router();
const onClickController = require('../controllers/onClickController');

router.get('/:id', onClickController.getOnClickPage);

module.exports = router;
