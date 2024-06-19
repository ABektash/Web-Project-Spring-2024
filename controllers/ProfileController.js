exports.getProfilePage = (req, res) => {
    res.render('pages/Profile', { user: req.session.user });
};