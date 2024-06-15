const express = require('express');
const router = express.Router();
const allMatchesController = require('../controllers/All-MatchesController');

router.get('/', allMatchesController.getAllMatchesPage);

module.exports = router;
