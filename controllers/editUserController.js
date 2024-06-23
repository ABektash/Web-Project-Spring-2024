const User = require('../models/User');
const bcrypt = require('bcryptjs');
const upload = require('../middleware/multer');

exports.getEditUserPage = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('pages/editUser', { user, errors: {}, get: true, admin: req.session.user });
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Server error');
    }
};

exports.postEditUserPage = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.render('pages/editUser', { user: {}, errors: { image: err }, get: false, admin: req.session.user });
        }
        console.log(req.body);
        const { name, email, password, gender, type, day, month, year } = req.body;
        const errors = {};
        const userId = req.params.id;

        // Validate input fields
        if (!name) {
            errors.name = 'Please enter a name';
        } else if (!/^[a-zA-Z ]+$/.test(name)) {
            errors.name = 'Name cannot contain special characters or numbers';
        }

        if (!email) {
            errors.email = 'Please enter an email';
        } else if (!isValidEmail(email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!gender) {
            errors.gender = 'Please select a gender';
        }

        if (!type) {
            errors.type = 'Please select a type for the User';
        }

        if (!day) {
            errors.day = 'Please enter the day';
        } else if (!/^\d{1,2}$/.test(day) || parseInt(day) < 1 || parseInt(day) > 31) {
            errors.day = 'Invalid number';
        }

        if (!month) {
            errors.month = 'Please enter the month';
        } else if (!/^\d{1,2}$/.test(month) || parseInt(month) < 1 || parseInt(month) > 12) {
            errors.month = 'Invalid number';
        }

        if (!year) {
            errors.year = 'Please enter the year';
        } else if (!/^\d{4}$/.test(year)) {
            errors.year = 'Invalid number';
        }

        if (Object.keys(errors).length > 0) {
            try {
                const user = await User.findById(userId);
                return res.render('pages/editUser', { user, errors, get: false, admin: req.session.user });
            } catch (err) {
                console.error('Error fetching user:', err);
                return res.status(500).send('Server error');
            }
        }

        try {
            const user = await User.findById(userId);
            let updatedFields = {
                name,
                email,
                gender,
                type,
                birthdate: new Date(year, month - 1, day), 
                image: req.files.image ? req.files.image[0].filename : req.body.currentImage,
            };

            if (password !== user.password) {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                updatedFields.password = hashedPassword;
            } else {
                updatedFields.password = user.password;
            }

            await User.findByIdAndUpdate(userId, updatedFields);

            res.redirect('/manageUsers');
        } catch (err) {
            console.error('Error editing user:', err);
            res.status(500).send('Internal Server Error');
        }
    });
};

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
