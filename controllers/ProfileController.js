const User = require('../models/User');
const Product = require('../models/Product');

exports.getProfilePage = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const user = await User.findById(userId)
            .populate('purchasedProducts')
            .populate('purchasedTickets')
            .exec();

        req.session.user.image = user.image;

        const uniqueProductNames = [...new Set(user.purchasedProducts.map(product => product.name))];
        const uniqueMatchNames = [...new Set(user.purchasedTickets.map(ticket => ticket.match))];

        res.render('pages/Profile', { user, uniqueProductNames, uniqueMatchNames });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('Server error');
    }
};



exports.geteditProfilePage = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('pages/editProfile', { user, errors: {}, get: true, admin: req.session.user });
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).send('Server error');
    }
};


exports.updateShirtDetails = async (req, res) => {
    const { shirtName, shirtNumber, shirtImg } = req.body; 
    const userId = req.session.user.id;
  
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { shirtName, shirtNumber, shirtImg }, 
        { new: true }
      );
  
      res.json({
        shirtName: user.shirtName,
        shirtNumber: user.shirtNumber,
        shirtImg: user.shirtImg,
      });
    } catch (error) {
      console.error('Error updating shirt details:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  


  exports.getProductIdByNameAndSize = async (req, res) => {
    const { name, size } = req.query;
    try {
        const product = await Product.findOne({ name, size });
        if (product) {
            res.json({ productId: product._id });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};