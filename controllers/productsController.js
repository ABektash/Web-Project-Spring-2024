const Product = require('../models/Product');
const upload = require('../middleware/multer');

exports.getProductsPage = (req, res) => {
  res.render('pages/Products', { errors: {}, get: true, admin: req.session.user });
};

exports.postProductPage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.render('pages/Products', { errors: { productImg: err }, get: false, admin: req.session.user });
    }

    const { name, price, quantity, size } = req.body;
    const errors = {};

    const nameRegex = /^[a-zA-Z\s\W]+$/;
    if (!name || !nameRegex.test(name)) {
      errors.name = "Please enter a valid name";
    }

    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!price || !priceRegex.test(price)) {
      errors.price = "Please enter a valid price";
    }

    if (!quantity || isNaN(quantity)) {
      errors.quantity = "Please enter the number of available pieces";
    }

    if (!size || size === "selectSize") {
      errors.size = "Please select a size";
    }

    if (!req.file) {
      errors.productImg = "Please upload an image";
    }

    if (Object.keys(errors).length > 0) {
      return res.render("pages/Products", { errors, get: false, admin: req.session.user });
    }

    try {
      const newProduct = new Product({
        name,
        price,
        quantity,
        size,
        productImg: req.files.productImg[0].filename
      });
      await newProduct.save();
      res.render("pages/Products", { errors: {}, get: false, admin: req.session.user });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  });
};
