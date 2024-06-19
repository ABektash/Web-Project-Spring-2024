exports.getNewsPage = (req, res) => {
    res.render('pages/News', {user: req.session.user});
};