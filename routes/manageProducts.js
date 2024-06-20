const express = require('express');
const router = express.Router();
const manageProductsController = require('../controllers/manageProductsController');
const editProductsController = require('../controllers/EditProductController');
const upload = require('../middleware/multer');

router.get('/',manageProductsController.getManageProductsPage);
router.get('/edit/:id', manageProductsController.getEditProductPage);
router.post('/edit/:id', editProductsController.postEditProductPage);
router.delete('/delete/:id', manageProductsController.deleteProduct);

module.exports = router;
