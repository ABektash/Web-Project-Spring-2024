const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const app = express();




require('dotenv').config();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'secretkey123', 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } 
}));

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});


app.use('/', require('./routes/index'));
app.use('/about', require('./routes/about'));
app.use('/Fixtures', require('./routes/Fixtures'));
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
app.use('/Logout',require('./routes/logout'));
app.use('/EditProduct',require('./routes/EditProduct'));
app.use('/EditProfile',require('./routes/EditProfile'));
app.use('/onclick',require('./routes/onclick'));
app.use('/news',require('./routes/news'));
app.use('/manageArticles',require('./routes/manageArticles'));
app.use('/editArticle',require('./routes/editArticle'));
app.use('/addArticle',require('./routes/addArticle'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
