const User = require("../models/User");


exports.getAddUserPage = (req, res) => {
    res.render('pages/addUser', { errors: {}, get: true });
};

exports.postAddUserPage = async (req, res) => {
    console.log(req.body);
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
        errors.day = 'Must be between 1-31';
    }

    if (!month) {
        errors.month = 'Please enter the month';
    } else if (!/^\d{1,2}$/.test(month) || parseInt(month) < 1 || parseInt(month) > 12) {
        errors.month = 'Must be between 1-12';
    }

    if (!year) {
        errors.year = 'Please enter the year';
    } else if (!/^\d{4}$/.test(year)) {
        errors.year = 'Year must be a valid 4-digit number';
    }





    if (Object.keys(errors).length > 0) {
        res.render('pages/addUser', { errors, get: false });
    }


    try {
        const newUser = new User({
            name,
            email,
            password,
            gender,
            birthdate: new Date(year, month, day)
        });
        await newUser.save();
        res.render('pages/addUser', { errors, get: false });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }

};
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}