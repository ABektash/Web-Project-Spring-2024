const express = require('express');
const router = express.Router();
const PlayersController = require('../controllers/PlayersController');

router.get('/', PlayersController.getPlayersPage);

module.exports = router;
