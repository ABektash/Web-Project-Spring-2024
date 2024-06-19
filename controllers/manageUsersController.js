const User = require("../models/User");

exports.getManageUsersPage = async (req, res) => {
    try {
        const users = await User.find();
        res.render('pages/manageUsers', { users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Server error');
    }
};


exports.getEditUserPage = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('pages/editUser', { user, errors: {}, get: true });
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Server error');
    }
};