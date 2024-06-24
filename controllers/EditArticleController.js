const Article = require('../models/Article');
const upload = require("../middleware/multer");

exports.getEditArticlePage = async (req, res) => {
  const articleId = req.params.id;
  try {
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).send('Article not found');
    }
    res.render('pages/EditArticle', { article, errors: {}, get: true, admin: req.session.user });
  } catch (err) {
    console.error("Error fetching article:", err);
    res.status(500).send("Server error");
  }
};

exports.postEditArticlePage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      try {
        const article = await Article.findById(articleId);
        return res.render('pages/EditArticle', { article, errors, get: false, admin: req.session.user });
      } catch (err) {
        console.error('Error fetching article:', err);
        return res.status(500).send('Server error');
      }
    }

    const { title, description, body } = req.body;
    const articleId = req.params.id;
    const errors = {};

    const titleRegex = /^[a-zA-Z0-9\s\W]+$/;
    if (!title || !titleRegex.test(title)) {
      errors.title = "Please enter a valid title";
    }

    if (!description || description.trim() === "") {
      errors.description = "Please enter a description";
    }

    if (!body || body.trim() === "") {
      errors.body = "Please enter the body of the article";
    }

    if (Object.keys(errors).length > 0) {
      try {
        const article = await Article.findById(articleId);
        return res.render('pages/EditArticle', { article, errors, get: false, admin: req.session.user });
      } catch (err) {
        console.error('Error fetching article:', err);
        return res.status(500).send('Server error');
      }
    }

    // Update article
    try {
      const articleImg = req.files.articleImg ? req.files.articleImg[0].filename : req.body.currentArticleImg;
      await Article.findByIdAndUpdate(articleId, {
        title,
        description,
        body,
        articleImg
      });
      res.redirect('/manageArticles');
    } catch (err) {
      console.error('Error updating article:', err);
      res.status(500).send('Server error');
    }
  });
};
