const Ticket = require('../models/Ticket');

exports.getTicketsPage = async (req, res) => {
    try {
        const tickets = await Ticket.find(); // Fetch all tickets from the database
        res.render('pages/Tickets', { user: req.session.user, tickets }); // Pass tickets to the EJS template
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};