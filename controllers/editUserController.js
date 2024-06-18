exports.getEditUserPage = (req, res) => {
    res.render('pages/editUser', { errors: {}, get: true });
};

exports.postEditUserPage = async (req, res) => {

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












    res.render("pages/editUser", { errors, get: false });


};

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}