exports.getFixturesPage = (req, res) => {
    res.render('pages/Fixtures', {user: req.session.user});
};