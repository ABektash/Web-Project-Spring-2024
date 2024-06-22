const Article = require('../models/Article');
const upload = require("../middleware/multer");

exports.getArticlesPage = (req, res) => {
  res.render("pages/addArticle", {
    errors: {},
    get: true,
    admin: req.session.user,
  });
};

exports.postArticlesPage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.render("pages/addArticle", {
        errors: { articleImg: err.message },
        get: false,
        admin: req.session.user,
      });
    }

    const { title, description, body } = req.body;
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

    if (!req.files || !req.files.articleImg) {
      errors.articleImg = "Please upload an image";
    }

    
    if (Object.keys(errors).length > 0) {
      return res.render("pages/addArticle", {
        errors,
        get: false,
        admin: req.session.user,
      });
    }

    try {
      const articleImg = req.files.articleImg[0].filename;
      const newArticle = new Article({
        title,
        description,
        body,
        articleImg
      });
      await newArticle.save();
      res.render('pages/addArticle', { errors: {}, get: false, admin: req.session.user, success: "Article edited successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
};
