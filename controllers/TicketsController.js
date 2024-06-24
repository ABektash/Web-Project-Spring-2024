const Ticket = require('../models/Ticket');

exports.getTicketsPage = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.render('pages/Tickets', { user: req.session.user, tickets }); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};