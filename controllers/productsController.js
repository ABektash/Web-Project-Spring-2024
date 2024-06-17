const Product = require("../models/Product");

exports.getProductsPage = (req, res) => {
  res.render('pages/Products', { errors: {}, get: true });
};

exports.postProductPage = async (req, res) => {
console.log(req.body);
  const { name, price, quantity, size, productImg } = req.body;
  const errors = {};


  var nameRegex = /^[a-zA-Z\s\W]+$/;
  if (name === "") {
    errors.name = "Please enter the name of the product";
  } else if (!nameRegex.test(name)) {
    errors.name = "Please enter a valid name";
  }

  var priceRegex = /^[0-9.,\s\W]+$/;
  if (price === "") {
    errors.price = "Please enter the price of the product";

  } else if (!priceRegex.test(price)) {
    errors.price = "Please enter a valid price";
  }


  if (quantity === "") {
    errors.quantity = "Please enter the number of available pieces";

  }

  if (size === "selectSize") {
    errors.size = "Please select a size";

  }

  if (productImg === "") {
    errors.productImg = "Please upload an image";
  }




  if(Object.keys(errors).length>0)
    {
      return res.render("pages/Products", { errors, get: false });
    }


    try{
      const newProduct=new Product({
        name,
        price,
        quantity,
        size,
        productImg
      });
      await newProduct.save();
      res.render("pages/Products", { errors, get: false });
    }
    catch(error){
       console.error(error);
       res.status(500).send('Server error');
    }
    
};


