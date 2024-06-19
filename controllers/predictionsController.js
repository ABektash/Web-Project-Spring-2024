exports.getPredictionsPage = (req, res) => {
    res.render('pages/predictions', {user: req.session.user});
};