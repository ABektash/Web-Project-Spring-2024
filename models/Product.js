const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String
  },
  productImg: {
    type: String
  },
  price: {
    type: Number
  },
  size: {
    type: String,
    enum: ['S', 'M', 'L', 'XL']
  },
  noOfSoldPieces: {
    type: Number
  },
  quantity: {
    type: Number
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;