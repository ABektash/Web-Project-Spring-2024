const express = require('express');
const router = express.Router();
const predictionsController = require('../controllers/predictionsController');

router.get('/', predictionsController.getPredictionsPage);

module.exports = router;
