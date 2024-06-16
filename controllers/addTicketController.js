exports.getAddTicketPage = (req, res) => {
    res.render('pages/addTicket', { errors: {}, get: true });
};

exports.postAddTicketPage = async (req, res) => {
    console.log(req.body);
    const { match, stadium, price, ticketType, day, month, year} = req.body;
    const errors = {};

    if (!match) {
        errors.match = 'Please the match title';
    }

    if (!stadium) {
        errors.stadium = 'Please stadium name';
    }
    if (!price) {
        errors.price = 'Please enter match price';

    } else if (! /^\d+$/.test(price)) {
        errors.price = 'Inavlid!';
    }
    if (!ticketType) {
        errors.ticketType = 'Please select ticket type';
    }

    if (!day) {
        errors.day = 'Please enter the day';
    } else if (!/^\d{1,2}$/.test(day) || parseInt(day) < 1 || parseInt(day) > 31) {
        errors.day = 'Inavlid number';
    }

    if (!month) {
        errors.month = 'Please enter the month';
    } else if (!/^\d{1,2}$/.test(month) || parseInt(month) < 1 || parseInt(month) > 12) {
        errors.month = 'Inavlid number';
    }

    if (!year) {
        errors.year = 'Please enter the year';
    } else if (!/^\d{4}$/.test(year)) {
        errors.year = 'Invalid number';
    } else {
        var enteredDate = new Date(year, month - 1, day);
        var currentDate = new Date();
        if (enteredDate < currentDate) {
            errors.year = 'Invalid date';
        }
    }

    res.render('pages/addTicket', { errors, get: false });

};
