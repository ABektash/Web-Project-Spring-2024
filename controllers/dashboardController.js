const User = require('../models/User');
const Product = require('../models/Product');

exports.getDashboardPage = async (req, res) => {
    try {
        const userCount = await User.countDocuments();

        const products = await Product.find();
        let totalSales = 0;
        products.forEach(product => {
            totalSales += product.price * product.noOfSoldPieces;
        });

        const topUsers = await User.find().sort({ purchasedProducts: -1 }).limit(5);

        const mostOrderedProduct = await Product.findOne().sort({ noOfSoldPieces: -1 });

        res.render('pages/dashboard', {
            admin: req.session.user,
            userCount,
            totalSales,
            topUsers,
            mostOrderedProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
