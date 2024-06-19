const Product = require('../models/Product');
const upload = require('../middleware/multer');  // Assuming you have multer configuration

exports.getEditProductPage = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('pages/EditProduct', { product, errors: {}, get: true });
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).send('Server error');
  }
};

exports.postEditProductPage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.render('pages/EditProduct', { product: {}, errors: { productImg: err }, get: false });
    }

    const { name, price, quantity, size } = req.body;
    const errors = {};
    const productId = req.params.id;

    // Validation logic
    const nameRegex = /^[a-zA-Z\s\W]+$/;
    if (!name || !nameRegex.test(name)) {
      errors.name = "Please enter a valid name of the product";
    }

    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!price || !priceRegex.test(price)) {
      errors.price = "Please enter a valid price of the product";
    }

    if (!quantity || isNaN(quantity)) {
      errors.quantity = "Please enter a valid number of available pieces";
    }

    if (!size || size === "selectSize") {
      errors.size = "Please select a size";
    }

    // Image validation (optional)
    if (!req.file && !req.body.currentProductImg) {
      errors.productImg = "Please upload an image";
    }

    if (Object.keys(errors).length > 0) {
      try {
        const product = await Product.findById(productId);
        return res.render('pages/EditProduct', { product, errors, get: false });
      } catch (err) {
        console.error('Error fetching product:', err);
        return res.status(500).send('Server error');
      }
    }

    // Update product
    try {
      const productImg = req.file ? req.file.filename : req.body.currentProductImg;
      await Product.findByIdAndUpdate(productId, {
        name,
        price,
        quantity,
        size,
        productImg
      });
      res.redirect('/manageProducts');
    } catch (err) {
      console.error('Error updating product:', err);
      res.status(500).send('Server error');
    }
  });
};
