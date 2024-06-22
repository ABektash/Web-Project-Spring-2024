// const Article = require('../models/Article');
const upload = require("../middleware/multer");

exports.getEditArticlePage = async (req, res) => {
  const articleId = req.params.id;
  try {
    // const article = await Article.findById(articleId);
    // if (!article) {
    //   return res.status(404).send('Article not found');
    // }
    // res.render('pages/EditArticle', { article, errors: {}, get: true, admin: req.session.user });
    res.render("pages/EditArticle", {
      errors: {},
      get: true,
      admin: req.session.user,
    });
  } catch (err) {
    console.error("Error fetching article:", err);
    res.status(500).send("Server error");
  }
};

exports.postEditArticlePage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.render("pages/editArticle", {
        errors: { articleImg: err.message },
        get: false,
        admin: req.session.user,
      });
    }

    const { title, date, description, body } = req.body;
    const errors = {};

    const titleRegex = /^[a-zA-Z0-9\s\W]+$/;
    if (!title || !titleRegex.test(title)) {
      errors.title = "Please enter a valid title";
    }

    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    const isValidDate = (dateString) => {
      const [year, month, day] = dateString.split("-");
      return dateRegex.test(`${month}/${day}/${year}`);
    };

    if (!date || !isValidDate(date)) {
      errors.date = "Please enter a valid date in MM/DD/YYYY format";
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

    return res.render("pages/editArticle", {
      errors,
      get: false,
      admin: req.session.user,
    });

    // Update article
    // try {
    //   const articleImg = req.files.articleImg ? req.files.articleImg[0].filename : req.body.currentArticleImg;
    //   await Article.findByIdAndUpdate(articleId, {
    //     name,
    //     category,
    //     section,
    //     price,
    //     quantity,
    //     size,
    //     articleImg
    //   });
    //   res.redirect('/manageArticles');
    // } catch (err) {
    //   console.error('Error updating article:', err);
    //   res.status(500).send('Server error');
    // }
  });
};
