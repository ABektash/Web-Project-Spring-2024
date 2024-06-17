const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();


require('dotenv').config();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});


app.use('/', require('./routes/index'));
app.use('/about', require('./routes/about'));
app.use('/News', require('./routes/News'));
app.use('/All-Matches', require('./routes/All-Matches'));
app.use('/Shop', require('./routes/Shop'));
app.use('/MenShop', require('./routes/MenShop'));
app.use('/WomenShop', require('./routes/WomenShop'));
app.use('/RetroShop', require('./routes/RetroShop'));
app.use('/ShoppingCart', require('./routes/ShoppingCart'));
app.use('/Players', require('./routes/Players'));
app.use('/predictions', require('./routes/predictions'));
app.use('/Profile', require('./routes/Profile'));
app.use('/singleProduct', require('./routes/singleProduct'));
app.use('/Tickets', require('./routes/Tickets'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/Products', require('./routes/products'));
app.use('/manageProducts',require('./routes/manageProducts'));
app.use('/manageTickets',require('./routes/manageTickets'));
app.use('/manageUsers',require('./routes/manageUsers'));
app.use('/editUser',require('./routes/editUser'));
app.use('/editTicket',require('./routes/editTicket'));
app.use('/addTicket',require('./routes/addTicket'));
app.use('/addUser',require('./routes/addUser'));
app.use('/BuyPage',require('./routes/BuyPage'));
app.use('/SignUp',require('./routes/SignUp'));
app.use('/Login',require('./routes/Login'));
// app.use('/EditProduct',require('./routes/EditProduct'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
