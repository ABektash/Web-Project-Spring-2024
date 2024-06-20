const Product = require('../models/Product');

exports.getMenShopPage = async (req, res) => {
    try {
        const menProducts = await Product.find({ category: 'Men' });

    const uniqueProducts = menProducts.reduce((acc, current) => {
      const x = acc.find(item => item.name === current.name);
      if (!x) {
        acc.push(current);
      }
      return acc;
    }, []);

    res.render('pages/MenShop', { user: req.session.user, products: uniqueProducts });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
