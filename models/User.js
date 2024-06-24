const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    image: {
        type: String
    },
    type: {
        type: String,
        enum: ['Admin', 'User'],
        required: true
    },
    shirtName: {
        type: String
    },
    shirtNumber: {
        type: Number
    },
    shirtImg: {
        type: String
    },
    purchasedProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    purchasedTickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
