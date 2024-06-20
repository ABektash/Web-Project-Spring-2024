const express = require('express');
const router = express.Router();
const manageUsersController = require('../controllers/manageUsersController');
const editUsersController = require('../controllers/editUserController');
const upload = require('../middleware/multer');

router.get('/',manageUsersController.getManageUsersPage);
router.get('/edit/:id', manageUsersController.getEditUserPage);
router.post('/edit/:id', editUsersController.postEditUserPage);
router.delete('/delete/:id', manageUsersController.deleteUser);

module.exports = router;