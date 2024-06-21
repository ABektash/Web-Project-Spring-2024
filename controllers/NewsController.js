exports.getNewsPage = (req, res) => {
    res.render('pages/news', {user: req.session.user});
};