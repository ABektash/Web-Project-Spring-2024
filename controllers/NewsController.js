const Article = require('../models/Article');

exports.getNewsPage = async (req, res) => {
    try {
        const articles = await Article.find();
        res.render('pages/News', { articles, user: req.session.user });
    } catch (err) {
        console.error('Error fetching articles:', err);
        res.status(500).send('Server error');
    }
};