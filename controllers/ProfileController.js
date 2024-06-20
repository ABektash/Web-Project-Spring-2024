const User = require('../models/User');

exports.getProfilePage = (req, res) => {
    res.render('pages/Profile', { user: req.session.user });
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