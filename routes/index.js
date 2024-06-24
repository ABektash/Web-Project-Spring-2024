const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

// Route for home page
router.get('/', mainController.getHomePage);
router.get('/', (req, res) => {
    res.render('index', { greeting: res.__('greeting') });
});

module.exports = router;
