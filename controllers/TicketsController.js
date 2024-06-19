exports.getTicketsPage = (req, res) => {
    res.render('pages/Tickets', {user: req.session.user});
};