exports.getProductsPage = (req, res) => {
  res.render('pages/Products', { errors: {}, get:true});
};

exports.postProductPage = async (req, res) => {

  const { name, price, quantity, size, productImg } = req.body;
  const errors = {};


  if (name == "") {
    errors.name = "Please enter the name of the product";
  }

  if (price == "") {
    errors.price = "Please enter the price of the product";
  }

  if (quantity == "") {
    errors.quantity = "Please enter the quantity of the product";
  }

  if (size === "selectSize") {
    errors.size = "Please enter the size of the product";
  }

  if (productImg == "") {
    errors.productImg = "Please enter the image of the product";
  }

 

    res.render("pages/Products", { errors ,get:false});
  

};