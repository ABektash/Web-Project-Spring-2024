const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    match: {
        type: String
    },
    stadium: {
        type: String
    },
    price: {
        type: Number
    },
    ticketType: {
        type: String,
        enum: ['vip', 'premium', 'standard']
    },
    date: {
        type: Date
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
