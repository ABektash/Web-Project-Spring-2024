const express = require('express');
const router = express.Router();
const FixturesController = require('../controllers/FixturesController');

router.get('/', FixturesController.getFixturesPage);

module.exports = router;
