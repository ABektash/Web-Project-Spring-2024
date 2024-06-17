const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    birthdate: {

        type: Date
    }
   
 
});
const User = mongoose.model('User', userSchema);

module.exports = User;
