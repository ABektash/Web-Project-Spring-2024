const Product = require('../models/Product');
const upload = require('../middleware/multer');  

exports.getEditProductPage = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    res.render('pages/EditProduct', { product, errors: {}, get: true, admin: req.session.user });
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).send('Server error');
  }
};

exports.postEditProductPage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.render('pages/EditProduct', { product: {}, errors: { productImg: err }, get: false, admin: req.session.user });
    }

    console.log(req.body);
    const { name,category,section, price, quantity, size } = req.body;
    const errors = {};
    const productId = req.params.id;

    // Validation logic
    const nameRegex = /^[a-zA-Z\s\W]+$/;
    if (!name || !nameRegex.test(name)) {
      errors.name = "Please enter a valid name";
    }

    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!price || !priceRegex.test(price)) {
      errors.price = "Please enter a valid price";
    }

    if (!quantity || isNaN(quantity)) {
      errors.quantity = "Please enter a valid number of available pieces";
    }

    if (!size || size === "selectSize") {
      errors.size = "Please select a size";
    }
    if (!category || category === "Select Category") {
      errors.category = "Please select a category";
    }
    if (!section || section === "Select Section") {
      errors.section = "Please select a section";
    }

    console.log("AUERFVIURBiufeuir");
    // Image validation (optional)
    if (!req.files && !req.body.currentProductImg) {
      errors.productImg = "Please upload an image";
    }

    console.log(errors);
    if (Object.keys(errors).length > 0) {
      try {
        const product = await Product.findById(productId);
        return res.render('pages/EditProduct', { product, errors, get: false, admin: req.session.user });
      } catch (err) {
        console.error('Error fetching product:', err);
        return res.status(500).send('Server error');
      }
    }

    // Update product
    try {
      console.log("AUERFVIURBiufeuir");
      const productImg = req.files.productImg ? req.files.productImg[0].filename : req.body.currentProductImg;
      await Product.findByIdAndUpdate(productId, {
        name,
        category,
        section,
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
