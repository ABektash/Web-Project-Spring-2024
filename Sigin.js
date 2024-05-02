
function showSignUpForm() {
    event.preventDefault();
    const loginForm = document.getElementById("loginForm");
    const signUpForm = document.getElementById("signUpForm");
    loginForm.style.display = 'none';
    signUpForm.style.display = 'block';

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

        alert(dataPreview);
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
    var gender = form.gender.value;

    var nameErr = emailErr = passwordErr = confpassErr = genderErr = true;

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

    if (gender == "") {
        printError("genderErr", "Please select your gender");
    } else {
        printError("genderErr", "");
        genderErr = false;
    }

    if (nameErr || emailErr || passwordErr || confpassErr || genderErr) {
        return false;
    } else {
        var dataPreview = "You've entered the following details: \n" +
            "Full Name: " + name + "\n" +
            "Email Address: " + email + "\n" +
            "Gender: " + gender + "\n";

        alert(dataPreview);
    }
    return true;
};


// Profile

function editShirtNumber() {
    var currentNumber = document.getElementById("number").textContent;
    var textBox = document.createElement("input");
    textBox.type = "text";
    textBox.id = "newShirtNumber";
    textBox.maxLength = 2;
    textBox.style.width = "2ch";
    textBox.value = currentNumber;
    textBox.setSelectionRange(0, 2);
    var numberElement = document.getElementById("number");
    var existingTextBox = document.getElementById("newShirtNumber");

    if (existingTextBox !== null) {
        numberElement.parentNode.removeChild(existingTextBox);
    }
    numberElement.parentNode.insertBefore(textBox, numberElement);
    numberElement.style.visibility = "hidden";


    function updateShirtNumber() {
        var newNumber = document.getElementById("newShirtNumber").value;

        if (/^\d{1,2}$/.test(newNumber)) {
            document.getElementById("number").textContent = newNumber;
            document.getElementById("shirtNumber").textContent = newNumber;
        } else {


            return;
        }


        textBox.parentNode.removeChild(textBox);
        numberElement.style.visibility = "visible";
    }

    textBox.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            updateShirtNumber();
        }
    });


    textBox.addEventListener("blur", updateShirtNumber);
}
