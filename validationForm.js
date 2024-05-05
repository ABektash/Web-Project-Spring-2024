function printError(id, errmsg) {
    var element = document.getElementById(id);
    if (element) {
        element.innerHTML = errmsg;
    } else {
        console.error("Element with ID '" + id + "' not found");
    }
}


function validationForm(form) {
    var name = form.name.value;
    var email = form.email.value;
    var address = form.Address.value;
    var city = form.city.value;
    var country = form.country.value;
    var zip = form.zipcode.value;
    var cardname = form.nameoncard.value;
    var cardnumber = form.cardnumber.value;
    var expmonth = form.expmonth.value;
    var expyear = form.expyear.value;
    var cvv = form.cvv.value;

    var nameErr = emailErr = addressErr = cityErr = countryErr = zipErr = cardnameErr = cardnumberErr = expmonthErr = expyearErr = cvvErr = false;

    // Validate name
    if (name == "") {
        printError("nameErr", "Please enter your name");
        nameErr = true;
    } else {
        var regex = /^[a-zA-Z\s]+$/;
        if (!regex.test(name)) {
            printError("nameErr", "Please enter a valid name");
            nameErr = true;
        } else {
            printError("nameErr", "");
        }
    }

    // Validate email address
    if (email == "") {
        printError("emailErr", "Please enter your email address");
        emailErr = true;
    } else {
        var regex = /^\S+@\S+\.\S+$/;
        if (!regex.test(email)) {
            printError("emailErr", "Please enter a valid email address");
            emailErr = true;
        } else {
            printError("emailErr", "");
        }
    }

    // Validate address
    if (address == "") {
        printError("addressErr", "Please enter your address");
        addressErr = true;
    } else {
        printError("addressErr", "");
    }

    // Validate city
    if (city == "") {
        printError("cityErr", "Please enter your city");
        cityErr = true;
    } else {
        printError("cityErr", "");
    }

    // Validate country
    if (country == "") {
        printError("countryErr", "Please enter your country");
        countryErr = true;
    } else {
        printError("countryErr", "");
    }

    // Validate zip code
    if (zip == "") {
        printError("zipErr", "Please enter your zip code");
        zipErr = true;
    } else {
        var regex = /^[0-9]+$/;
        if (!regex.test(zip)) {
            printError("zipErr", "Please enter a valid zip code");
            zipErr = true;
        } else {
            printError("zipErr", "");
        }
    }

    // Validate card name
    if (cardname == "") {
        printError("cardnameErr", "Please enter the name on your card");
        cardnameErr = true;
    } else {
        var regex = /^[a-zA-Z\s]+$/;
        if (!regex.test(cardname)) {
            printError("cardnameErr", "Please enter a valid name on your card");
            cardnameErr = true;
        } else {
            printError("cardnameErr", "");
        }
    }

    // Validate card number
    if (cardnumber == "") {
        printError("cardnumberErr", "Please enter your card number");
        cardnumberErr = true;
    } else {
        var regex = /^[0-9]+$/;
        if (!regex.test(cardnumber)) {
            printError("cardnumberErr", "Please enter a valid card number");
            cardnumberErr = true;
        } else {
            printError("cardnumberErr", "");
        }
    }

    // Validate expiration month
    if (expmonth == "") {
        printError("expmonthErr", "Please enter your card's expiration month");
        expmonthErr = true;
    } else {
        printError("expmonthErr", "");
    }

    // Validate expiration year
    if (expyear == "") {
        printError("expyearErr", "Please enter your card's expiration year");
        expyearErr = true;
    } else {
        printError("expyearErr", "");
    }

    // Validate CVV
    if (cvv == "") {
        printError("cvvErr", "Please enter your card's CVV");
        cvvErr = true;
    } else {
        var regex = /^[0-9]+$/;
        if (!regex.test(cvv)) {
            printError("cvvErr", "Please enter a valid CVV");
            cvvErr = true;
        } else {
            printError("cvvErr", "");
        }
    }

    // Prevent form submission if there are any validation errors
    if (nameErr || emailErr || addressErr || cityErr || countryErr || zipErr || cardnameErr || cardnumberErr || expmonthErr || expyearErr || cvvErr) {
        return false;
    } else {
        alert("Form submitted successfully");
        return true;
    }
}


document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("booking");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent default form submission
            validationForm(this); // Validate the form
        });
    } else {
        console.error("Form element not found");
    }
});