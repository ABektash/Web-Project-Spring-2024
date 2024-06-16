exports.getBuyPage = (req, res) => {
    res.render('pages/BuyPage', { errors: {}, get: true });
};

exports.postBuyPage = async (req, res) => {
    console.log(req.body);
    const { name, email, address, city, country, zipcode, nameoncard, cardnumber, month, year, cvv } = req.body;
    const errors = {};

    if (!name) {
        errors.name = "Please enter your name";
    } else if (!/^[a-zA-Z ]+$/.test(name)) {
        errors.name = "Name cannot contain special characters or numbers";
    }

    if (!email) {
        errors.email = "Please enter your email";
    } else if (!isValidEmail(email)) {
        errors.email = "Please enter a valid email address";
    }

    if (!address) {
        errors.address = "Please enter your address";
    }

    if (!city) {
        errors.city = "Please enter your city";
    } else if (!/^[a-zA-Z ]+$/.test(city)) {
        errors.city =
            "City cannot contain special characters or numbers";
    }

    if (!country) {
        errors.country = "Please enter your country";
    } else if (!/^[a-zA-Z ]+$/.test(country)) {
        errors.country =
            "Country cannot contain special characters or numbers";
    }

    if (!zipcode) {
        errors.zipcode = "Please enter the zipcode";
    } else if (!/^[0-9]{1,6}$/.test(zipcode) || zipcode.length != 6) {
        errors.zipcode = "Invalid zipcode";
    }

    if (!nameoncard) {
        errors.nameoncard = "Please enter card name";
    } else if (!/^[a-zA-Z ]+$/.test(nameoncard)) {
        errors.nameoncard =
            "Card name cannot contain special characters or numbers";
    }

    if (!cardnumber) {
        errors.cardnumber = "Please enter the card number";
    } else if (!/^([0-9]{4}[\s-]?){3}([0-9]{4})$/.test(cardnumber)) {
        errors.cardnumber = "Invalid card number";
    }

    if (!month) {
        errors.month = "Please enter the month";
    } else if (
        !/^[1-9]$|^[1][0-2]$/.test(month) ||
        parseInt(month) < 1 ||
        parseInt(month) > 12
    ) {
        errors.month = "Month must be a number between 1 and 12";
    }

    if (!year) {
        errors.year = "Please enter the year";
    } else if (!/^\d{4}$/.test(year)) {
        errors.year = "Year must be a valid 4-digit number";
    }

    if (!cvv) {
        errors.cvv = "Please enter the CVV";
    } else if (!/^[0-9]{3,4}$/.test(cvv)) {
        errors.cvv = "Invalid CVV";
    }

    res.render('pages/BuyPage', { errors, get: false });

};
function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}