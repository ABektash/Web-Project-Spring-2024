exports.getRetroShopPage = (req, res) => {
    res.render('pages/RetroShop', {user: req.session.user});
};