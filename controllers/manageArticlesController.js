// const Article = require('../models/Article');

exports.getManageArticlesPage = async (req, res) => {
    try {
        // const articles = await Article.find();
        // res.render('pages/manageArticles', { articles, admin: req.session.user });
        res.render('pages/manageArticles', {admin: req.session.user });
    } catch (err) {
        console.error('Error fetching articles:', err);
        res.status(500).send('Server error');
    }
};


exports.getEditArticlePage = async (req, res) => {
    try {
        const articleId = req.params.id;
        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).send('Article not found');
        }
        res.render('pages/editArticle', { article, errors: {}, get: true, admin: req.session.user });
    } catch (err) {
        console.error('Error fetching article:', err);
        res.status(500).send('Server error');
    }
};


exports.deleteArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        await Article.findByIdAndDelete(articleId);
        res.status(200).json({ message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting article', error });
    }
};