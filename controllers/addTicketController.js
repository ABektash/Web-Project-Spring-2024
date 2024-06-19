const Ticket = require('../models/Ticket');

exports.getAddTicketPage = (req, res) => {
    res.render('pages/addTicket', { errors: {}, get: true, admin: req.session.user});
};

exports.postAddTicketPage = async (req, res) => {
    const { match, stadium, price, ticketType, day, month, year } = req.body;
    const errors = {};

    if (!match) {
        errors.match = 'Please enter the match title';
    }

    if (!stadium) {
        errors.stadium = 'Please enter the stadium name';
    }

    if (!price) {
        errors.price = 'Please enter the match price';
    } else if (!/^\d+$/.test(price)) {
        errors.price = 'Invalid price';
    }

    if (!ticketType) {
        errors.ticketType = 'Please select a ticket type';
    }

    if (!day) {
        errors.day = 'Please enter the day';
    } else if (!/^\d{1,2}$/.test(day) || parseInt(day) < 1 || parseInt(day) > 31) {
        errors.day = 'Invalid day';
    }

    if (!month) {
        errors.month = 'Please enter the month';
    } else if (!/^\d{1,2}$/.test(month) || parseInt(month) < 1 || parseInt(month) > 12) {
        errors.month = 'Invalid month';
    }

    if (!year) {
        errors.year = 'Please enter the year';
    } else if (!/^\d{4}$/.test(year)) {
        errors.year = 'Invalid year';
    } else {
        const enteredDate = new Date(year, month, day);
        const currentDate = new Date();
        if (enteredDate < currentDate) {
            errors.year = 'Invalid date';
        }
    }

    if (Object.keys(errors).length > 0) {
        return res.render('pages/addTicket', { errors, get: false, admin: req.session.user });
    }

    try {
        const newTicket = new Ticket({
            match,
            stadium,
            price: parseFloat(price),
            ticketType,
            date: new Date(year, month, day)
        });

        await newTicket.save();
        res.render('pages/addTicket', { errors: {}, get: false, success: true, admin: req.session.user });
    } catch (err) {
        console.error('Error saving ticket:', err);
        res.status(500).send('Server error');
    }
};
