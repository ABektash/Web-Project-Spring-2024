const Ticket = require('../models/Ticket');

exports.getEditTicketPage = (req, res) => {
    res.render('pages/editTicket', { ticket: {}, errors: {}, get: true });
};

exports.postEditTicketPage = async (req, res) => {
    const { match, stadium, price, ticketType, day, month, year } = req.body;
    const errors = {};
    const ticketId = req.params.id;

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
        try {
            const ticket = await Ticket.findById(ticketId);
            return res.render('pages/editTicket', { ticket, errors, get: false });
        } catch (err) {
            console.error('Error fetching ticket:', err);
            return res.status(500).send('Server error');
        }
    }

    try {
        await Ticket.findByIdAndUpdate(ticketId, {
            match,
            stadium,
            price,
            ticketType,
            date: new Date(year, month, day)
        });
        res.redirect('/manageTickets');
    } catch (err) {
        console.error('Error updating ticket:', err);
        res.status(500).send('Server error');
    }
};