const express = require('express');
const router = express.Router();
const manageArticlesController = require('../controllers/manageArticlesController');
const editArticlesController = require('../controllers/EditArticleController');
const upload = require('../middleware/multer');

router.get('/',manageArticlesController.getManageArticlesPage);
router.get('/edit/:id', manageArticlesController.getEditArticlePage);
router.post('/edit/:id', editArticlesController.postEditArticlePage);
router.delete('/delete/:id', manageArticlesController.deleteArticle);

module.exports = router;
