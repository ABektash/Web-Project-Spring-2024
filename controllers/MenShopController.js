exports.getMenShopPage = (req, res) => {
    res.render('pages/MenShop', {user: req.session.user});
};