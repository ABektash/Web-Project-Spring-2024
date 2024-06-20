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
    enum:['Football Kits','Training','Hoodies and Sweatshirts','Trousers and Shorts','Footwear','Headwear']
  },
  productImg: {
    type: String
  },
  price: {
    type: Number
  },
  size: {
    type: String,
    enum: ['S', 'M', 'L', 'XL','XXL']
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