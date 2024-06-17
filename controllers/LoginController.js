exports.getLogin = (req, res) => {
    res.render('pages/Login', { errors: {}, get: true });
};

exports.postLogin = async (req, res) => {
    console.log(req.body);
    const {email, password} = req.body;
    const errors = {};


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

    
    if (Object.keys(errors).length == 0){
        res.render('pages/index', { errors, get: false });
    } else {
        res.render('pages/Login', { errors, get: false });
    }

};
