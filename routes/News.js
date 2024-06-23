const express = require('express');
const router = express.Router();
const newsController = require('../controllers/NewsController');

router.get('/', newsController.getNewsPage);

module.exports = router;
