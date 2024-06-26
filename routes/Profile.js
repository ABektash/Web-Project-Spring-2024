const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/ProfileController');
const editProfileController = require('../controllers/editProfileController');

router.get('/edit/:id', ProfileController.geteditProfilePage);
router.post('/edit/:id', editProfileController.posteditProfilePage);
router.get('/', ProfileController.getProfilePage);
router.post('/updateShirtDetails', ProfileController.updateShirtDetails);
router.get('/getProductIdByNameAndSize', ProfileController.getProductIdByNameAndSize);

module.exports = router;
