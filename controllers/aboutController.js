exports.getAboutPage = (req, res) => {
    res.render('pages/about', {user: req.session.user});
};
