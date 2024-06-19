exports.getSingleProductPage = (req, res) => {
    res.render('pages/singleProduct', {user: req.session.user});
};