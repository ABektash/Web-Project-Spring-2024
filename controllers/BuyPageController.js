const User = require('../models/User');
const Product = require('../models/Product');
const Ticket = require('../models/Ticket');

exports.getBuyPage = (req, res) => {
    res.render('pages/BuyPage', { errors: {}, get: true, user: req.session.user });
};


exports.postBuyPage = async (req, res) => {
    const { name, email, address, city, country, zipcode, nameoncard, cardnumber, month, year, cvv } = req.body;
    const errors = {};

    // Validate input
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
        errors.city = "City cannot contain special characters or numbers";
    }

    if (!country) {
        errors.country = "Please enter your country";
    } else if (!/^[a-zA-Z ]+$/.test(country)) {
        errors.country = "Country cannot contain special characters or numbers";
    }

    if (!zipcode) {
        errors.zipcode = "Please enter the zipcode";
    } else if (!/^[0-9]{6}$/.test(zipcode)) {
        errors.zipcode = "Invalid zipcode";
    }

    if (!nameoncard) {
        errors.nameoncard = "Please enter card name";
    } else if (!/^[a-zA-Z ]+$/.test(nameoncard)) {
        errors.nameoncard = "Card name cannot contain special characters or numbers";
    }

    if (!cardnumber) {
        errors.cardnumber = "Please enter the card number";
    } else if (!/^([0-9]{4}[\s-]?){3}([0-9]{4})$/.test(cardnumber)) {
        errors.cardnumber = "Invalid card number";
    }

    if (!month) {
        errors.month = "Please enter the month";
    } else if (!/^(0?[1-9]|1[0-2])$/.test(month)) {
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

    if (Object.keys(errors).length > 0) {
        console.log("Validation errors:", errors);
        return res.render('pages/BuyPage', { errors, get: false, user: req.session.user });
    }

    const sessionCart = req.session.cart;
    if (!sessionCart || !sessionCart.products.length) {
        errors.cart = "Your cart is empty";
        console.log("Cart is empty");
        return res.render('pages/BuyPage', { errors, get: false, user: req.session.user });
    }

    try {
        const userId = req.session.user.id;
        const user = await User.findById(userId);

        if (!user) {
            errors.user = "User not found";
            console.log("User not found");
            return res.render('pages/BuyPage', { errors, get: false, user: req.session.user });
        }

        const productUpdates = sessionCart.products.map(async (productId, index) => {
            const product = await Product.findById(productId);
            if (!product) {
                throw new Error(`Product with ID ${productId} not found`);
            }
            const quantityBought = sessionCart.quantities[index];
            if (product.quantity < quantityBought) {
                throw new Error(`Insufficient stock for product ${product.name}`);
            }
            product.quantity -= quantityBought;
            product.noOfSoldPieces += quantityBought;
            await product.save();

            user.purchasedProducts.push(product._id);
        });

        await Promise.all(productUpdates);
        await user.save();

        req.session.cart = { products: [], quantities: [], total: 0 };
        console.log("Purchase successful");
        res.render('pages/BuyPage', { errors: {}, get: false, user: req.session.user });
    } catch (error) {
        console.error("Error processing purchase:", error);
        errors.general = error.message;
        res.render('pages/BuyPage', { errors, get: false, user: req.session.user });
    }
};

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


exports.postBuyTicketPage = async (req, res) => {
    const { name, email, address, city, country, zipcode, nameoncard, cardnumber, month, year, cvv } = req.body;
    const errors = {};

    // Validate input
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
        errors.city = "City cannot contain special characters or numbers";
    }

    if (!country) {
        errors.country = "Please enter your country";
    } else if (!/^[a-zA-Z ]+$/.test(country)) {
        errors.country = "Country cannot contain special characters or numbers";
    }

    if (!zipcode) {
        errors.zipcode = "Please enter the zipcode";
    } else if (!/^[0-9]{6}$/.test(zipcode)) {
        errors.zipcode = "Invalid zipcode";
    }

    if (!nameoncard) {
        errors.nameoncard = "Please enter card name";
    } else if (!/^[a-zA-Z ]+$/.test(nameoncard)) {
        errors.nameoncard = "Card name cannot contain special characters or numbers";
    }

    if (!cardnumber) {
        errors.cardnumber = "Please enter the card number";
    } else if (!/^([0-9]{4}[\s-]?){3}([0-9]{4})$/.test(cardnumber)) {
        errors.cardnumber = "Invalid card number";
    }

    const currentDate = new Date();
    const enteredDate = new Date(year, month - 1); 
    if (enteredDate <= currentDate) {
        errors.month = "The expiration date must be in the future";
        errors.year = "The expiration date must be in the future";
    }
    
    if (!month) {
        errors.month = "Please enter the month";
    } else if (!/^(0?[1-9]|1[0-2])$/.test(month)) {
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

    if (Object.keys(errors).length > 0) {
        console.log("Validation errors:", errors);
        return res.render('pages/BuyPage', { errors, get: false, user: req.session.user });
    }


    try {
        const userId = req.session.user.id;
        const ticketId = req.params.id;
        const user = await User.findById(userId);
        const ticket = await Ticket.findById(ticketId);

        if (!user) {
            errors.user = "User not found";
            console.log("User not found");
            return res.render('pages/BuyPage', { errors, get: false, user: req.session.user });
        }

       

        user.purchasedTickets.push(ticket._id);

        await user.save();

        console.log("Purchase successful");
        res.render('pages/BuyPage', { errors: {}, get: false, user: req.session.user });
    } catch (error) {
        console.error("Error processing purchase:", error);
        errors.general = error.message;
        res.render('pages/BuyPage', { errors, get: false, user: req.session.user });
    }
};

