const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Route for home page
router.get('/', mainController.getHomePage);

module.exports = router;
