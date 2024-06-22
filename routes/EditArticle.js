const express = require('express');
const router = express.Router();
const EditArticleController = require('../controllers/EditArticleController');

router.get('/', EditArticleController.getEditArticlePage);
router.post('/', EditArticleController.postEditArticlePage);

module.exports = router;