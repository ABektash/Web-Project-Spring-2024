const Product = require('../models/Product');

exports.getRetroShopPage = async (req, res) => {
  try {
    const retroProducts = await Product.find({ category: 'Retro' });

    const uniqueProducts = retroProducts.reduce((acc, current) => {
      const x = acc.find(item => item.name === current.name);
      if (!x) {
        acc.push(current);
      }
      return acc;
    }, []);

    res.render('pages/RetroShop', { user: req.session.user, products: uniqueProducts });
  } catch (error) {
    console.error("Error fetching retro products:", error);
    res.status(500).send("Internal Server Error");
  }
};
