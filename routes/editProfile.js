const express = require('express');
const router = express.Router();
const editProfileController = require('../controllers/editProfileController');

router.get('/:id', editProfileController.geteditProfilePage);
router.post('/',editProfileController.posteditProfilePage);

module.exports = router;


