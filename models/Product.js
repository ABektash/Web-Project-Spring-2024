const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String
  },
  price: {
    type: Number
  },
  quantity: {
    type: Number
  },
  size: {
    type: String,
    enum: ['S', 'M', 'L', 'XL']  
  },
  productImg: {
    type: String
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
