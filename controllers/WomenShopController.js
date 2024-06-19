exports.getWomenShopPage = (req, res) => {
    res.render('pages/WomenShop', {user: req.session.user});
};