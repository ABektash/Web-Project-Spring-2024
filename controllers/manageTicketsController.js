const Ticket = require('../models/Ticket');

exports.getManageTicketsPage = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.render('pages/manageTickets', { tickets, admin: req.session.user });
    } catch (err) {
        console.error('Error fetching tickets:', err);
        res.status(500).send('Server error');
    }
};


exports.getEditTicketPage = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const ticket = await Ticket.findById(ticketId);
        if (!ticket) {
            return res.status(404).send('Ticket not found');
        }
        res.render('pages/editTicket', { ticket, errors: {}, get: true, admin: req.session.user });
    } catch (err) {
        console.error('Error fetching ticket:', err);
        res.status(500).send('Server error');
    }
};
