const Product = require('../models/Product'); 

exports.getWomenShopPage = async (req, res) => {
    try {
        const womenProducts = await Product.find({ category: 'Women' });

    const uniqueProducts = womenProducts.reduce((acc, current) => {
      const x = acc.find(item => item.name === current.name);
      if (!x) {
        acc.push(current);
      }
      return acc;
    }, []);

    res.render('pages/WomenShop', { user: req.session.user, products: uniqueProducts });
    } catch (error) {
        console.error('Error fetching women products:', error);
        res.status(500).send('Internal Server Error');
    }
};