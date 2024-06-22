const Article = require('../models/Article');

exports.getOnClickPage = async (req, res) => {
    const articleId = req.params.id;

    try {
        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).send('Article not found');
        }
        res.render('pages/onclick', { article, errors: {}, get: true, user: req.session.user });
    } catch (err) {
        console.error("Error fetching article:", err);
        res.status(500).send("Server error");
    }
};
