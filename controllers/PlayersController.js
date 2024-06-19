exports.getPlayersPage = (req, res) => {
    res.render('pages/Players', {user: req.session.user});
};