exports.getOnClickPage = (req, res) => {
    res.render('pages/onclick', {user: req.session.user});
};
