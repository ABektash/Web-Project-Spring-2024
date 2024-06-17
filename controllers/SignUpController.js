exports.getSignUp = (req, res) => {
    res.render('pages/SignUp', { errors: {}, get: true });
};

exports.postSignUp = async (req, res) => {
    console.log(req.body);
    const { name, email, password,confpassword, day, month, year, gender } = req.body;
    const errors = {};


    if (name == "") {
        errors.name = "Please enter your name";
    } else {
        var regex = /^[a-zA-Z\s]+$/;
        if (regex.test(name) === false) {
            errors.name = "Please enter a valid name";
        } 
    }

    if (email == "") {
        errors.email = "Please enter your email address";
    } else {
        var regex = /^\S+@\S+\.\S+$/;
        if (regex.test(email) === false) {
            errors.email = "Please enter a valid email address";
        } 
    }

    if (password == "") {
        errors.password = "Please enter a password";
    } else {
        if (password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        } 
    }

    if (confpassword == "") {
        errors.confpassword = "Please confirm your password";
    } else {
        if (confpassword !== password) {
            errors.confpassword = "Passwords do not match";
        } 
    }

    if (day == "" || month == "" || year == "") {
        errors.dob = "Invalid date of birth";
    } 

    

    if (!gender) {
        errors.gender = "Please select your gender";
    } 

    if (Object.keys(errors).length == 0){
        res.render('pages/Profile', { errors, get: false });
    } else {
        res.render('pages/SignUp', { errors, get: false });
    }

};
