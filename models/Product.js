const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String
  },
  category:
  {
    type:String,
    enum:['Men','Women','Retro']
  },
  section:
  {
    type:String,
    enum:['kit','training','h&sw','t&sh','footwear','headwear']
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