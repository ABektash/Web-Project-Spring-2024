const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/ProfileController');

router.get('/', ProfileController.getProfilePage);

module.exports = router;
