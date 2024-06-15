
function showSignUpForm() {
    event.preventDefault();
    const loginForm = document.getElementById("loginForm");
    const signUpForm = document.getElementById("signUpForm");
    loginForm.style.display = 'none';
    signUpForm.style.display = 'block';

}
function showLoginForm() {
    event.preventDefault();
    const loginForm = document.getElementById("loginForm");
    const signUpForm = document.getElementById("signUpForm");
    loginForm.style.display = 'block';
    signUpForm.style.display = 'none';

}


function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
}

function validateLogInForm(form) {

    var email = form.email.value;
    var password = form.password.value;

    var emailErr = passwordErr = true;

    if (email == "") {
        printError("loginEmailErr", "Please enter your email address");
    } else {
        var regex = /^\S+@\S+\.\S+$/;
        if (regex.test(email) === false) {
            printError("loginEmailErr", "Please enter a valid email address");
        } else {
            printError("loginEmailErr", "");
            emailErr = false;
        }
    }

    if (password == "") {
        printError("loginPasswordErr", "Please enter a password");
    } else {
        if (password.length < 6) {
            printError("loginPasswordErr", "Password must be at least 6 characters");
        } else {
            printError("loginPasswordErr", "");
            passwordErr = false;
        }
    }

    if (emailErr || passwordErr) {
        return false;
    } else {
        var dataPreview = "You've entered the following details: \n" +
            "Email Address: " + email + "\n" +
            "Password: " + password + "\n";

        // alert(dataPreview);
    }
    return true;
};

function printError(elemId, hintMsg) {
    document.getElementById(elemId).innerHTML = hintMsg;
}

function validateSignUpForm(form) {
    var name = form.name.value;
    var email = form.email.value;
    var password = form.password.value;
    var confpassword = form.confpassword.value;
    var day = form.day.value;
    var month = form.month.value;
    var year = form.year.value;
    var gender = form.gender.value;

    var nameErr = emailErr = passwordErr = confpassErr = dobErr = genderErr = true;

    if (name == "") {
        printError("nameErr", "Please enter your name");
    } else {
        var regex = /^[a-zA-Z\s]+$/;
        if (regex.test(name) === false) {
            printError("nameErr", "Please enter a valid name");
        } else {
            printError("nameErr", "");
            nameErr = false;
        }
    }

    if (email == "") {
        printError("emailErr", "Please enter your email address");
    } else {
        var regex = /^\S+@\S+\.\S+$/;
        if (regex.test(email) === false) {
            printError("emailErr", "Please enter a valid email address");
        } else {
            printError("emailErr", "");
            emailErr = false;
        }
    }

    if (password == "") {
        printError("passwordErr", "Please enter a password");
    } else {
        if (password.length < 6) {
            printError("passwordErr", "Password must be at least 6 characters");
        } else {
            printError("passwordErr", "");
            passwordErr = false;
        }
    }

    if (confpassword == "") {
        printError("confpassErr", "Please confirm your password");
    } else {
        if (confpassword !== password) {
            printError("confpassErr", "Passwords do not match");
        } else {
            printError("confpassErr", "");
            confpassErr = false;
        }
    }

    if (day == "" || month == "" || year == "") {
        printError("dobErr", "Please enter your date of birth");
    } else {
        printError("dobErr", "");
        dobErr = false;
    }

    if (gender == "") {
        printError("genderErr", "Please select your gender");
    } else {
        printError("genderErr", "");
        genderErr = false;
    }

    if (nameErr || emailErr || passwordErr || confpassErr || dobErr || genderErr) {
        return false;
    }
    return true;
}