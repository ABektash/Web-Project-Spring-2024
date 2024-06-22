const User = require('../models/User');

exports.getProfilePage = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const user = await User.findById(userId).populate('purchasedProducts').exec();

        const uniqueProductNames = [...new Set(user.purchasedProducts.map(product => product.name))];

        res.render('pages/Profile', { user, uniqueProductNames });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('Server error');
    }
};


exports.geteditProfilePage = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('pages/editProfile', { user, errors: {}, get: true, admin: req.session.user });
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Server error');
    }
};