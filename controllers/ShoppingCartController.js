exports.getShoppingCartPage = (req, res) => {
    res.render('pages/ShoppingCart', {user: req.session.user});
};