exports.getHomePage = (req, res) => {
    res.render('pages/index', { title: 'Man Utd Home Page', user: req.session.user });
};
