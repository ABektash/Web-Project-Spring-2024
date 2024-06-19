const Product = require('../models/Product');

exports.getManageProductsPage = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('pages/manageProducts', { products });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Server error');
    }
};


exports.getEditProductPage = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('pages/editProduct', { product, errors: {}, get: true });
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).send('Server error');
    }
};