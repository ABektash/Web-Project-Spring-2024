const User = require("../models/User");
const upload = require('../middleware/multer');

exports.getAddUserPage = (req, res) => {
    res.render('pages/addUser', { errors: {}, get: true });
};

exports.postAddUserPage = async (req, res) => {

    upload(req, res, async (err) => {
        if (err) {
            console.log('Error during file upload:', err);
            return res.render('pages/addUser', { errors: { image: err.message }, get: false });
        }

        const { name, email, password, gender, type, day, month, year } = req.body;

        const errors = {};

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

        if (!password) {
            errors.password = 'Please enter a password';
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
            errors.day = 'Day must be between 1-31';
        }

        if (!month) {
            errors.month = 'Please enter the month';
        } else if (!/^\d{1,2}$/.test(month) || parseInt(month) < 1 || parseInt(month) > 12) {
            errors.month = 'Month must be between 1-12';
        }

        if (!year) {
            errors.year = 'Please enter the year';
        } else if (!/^\d{4}$/.test(year)) {
            errors.year = 'Year must be a valid 4-digit number';
        }

        if (Object.keys(errors).length > 0) {
            return res.render('pages/addUser', { errors, get: false });
        }

        try {
            const newUser = new User({
                name,
                email,
                password,
                gender,
                type,
                birthdate: new Date(year, month, day), 
                points: 0,
                purchasedProducts: [],
                purchasedTickets: []
            });

          
            if (req.files && req.files.image) {
                newUser.image = req.files.image[0].path;
            }

            console.log('Saving new user:', newUser);

            await newUser.save();
            console.log('User saved successfully');
            res.render('pages/addUser', { errors: {}, get: false, success: true });
        } catch (error) {
            console.error('Error saving user:', error);
            res.status(500).send('Server error');
        }
    });
};

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
