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


exports.deleteTicket = async (req, res) => {
    try {
        const ticketId = req.params.id;
        await Ticket.findByIdAndDelete(ticketId);
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting ticket', error });
    }
};
