exports.getShopPage = (req, res) => {
    res.render('pages/Shop', {user: req.session.user});
};