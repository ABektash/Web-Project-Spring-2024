const express = require('express');
const router = express.Router();
const addArticleController = require('../controllers/addArticleController');

router.get('/',addArticleController.getArticlesPage );
router.post('/',addArticleController.postArticlesPage);

module.exports = router;