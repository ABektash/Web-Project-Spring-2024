exports.getDashboardPage = (req, res) => {
    res.render('pages/dashboard', {admin: req.session.user});
};
