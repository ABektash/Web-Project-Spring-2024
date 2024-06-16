const express = require('express');
const router = express.Router();
const editUserController = require('../controllers/editUserController');

router.get('/', editUserController.getEditUserPage);
router.post('/',editUserController.postEditUserPage);

module.exports = router;


