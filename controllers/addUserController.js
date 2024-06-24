const User = require("../models/User");
const bcrypt = require('bcryptjs');
const upload = require('../middleware/multer');

exports.getAddUserPage = (req, res) => {
    res.render('pages/addUser', { errors: {}, get: true, admin: req.session.user });
};

exports.postAddUserPage = async (req, res) => {

    upload(req, res, async (err) => {
        if (err) {
            console.log('Error during file upload:', err);
            return res.render('pages/addUser', { errors: { image: err.message }, get: false, admin: req.session.user });
        }

        let { name, email, password, gender, type, day, month, year } = req.body;
        email = email.toLowerCase()

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
            errors.type = 'Please select a type';
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
        }else {
            const enteredDate = new Date(year, month, day);
            const currentDate = new Date();
            if (enteredDate >= currentDate) {
                errors.year = 'Invalid date';
            }
        }

        if (Object.keys(errors).length > 0) {
            return res.render('pages/addUser', { errors, get: false, admin: req.session.user });
        }

        try {

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const defaultShirtImg = "https://www.manutd.com/assets/images/bg/t-shirt.png";
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                gender,
                type,
                birthdate: new Date(year, month - 1, day), 
                shirtNumber: 0,
                shirtName: name.split(' ')[0],
                shirtImg: defaultShirtImg,
                purchasedProducts: [],
                purchasedTickets: []
            });

          
            if (req.files && req.files.image) {
                newUser.image = req.files.image[0].filename;
            }

            console.log('Saving new user:', newUser);

            await newUser.save();
            console.log('User saved successfully');
            res.render('pages/addUser', { errors: {}, get: false, success: true, admin: req.session.user });
        } catch (error) {
            // console.error('Error saving user:', error);
            // res.status(500).send('Server error');
            errors.email = "Email is already used";
            return res.render('pages/addUser', { errors, get: false, admin: req.session.user });
        }
    });
};

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
