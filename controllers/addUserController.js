exports.getAddUserPage = (req, res) => {
    res.render('pages/addUser', { errors: {}, get: true });
};

exports.postAddUserPage = async (req, res) => {
    console.log(req.body);
    const { name, email, password, gender, day, month, year} = req.body;
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



    res.render('pages/addUser', { errors, get: false });

};
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}