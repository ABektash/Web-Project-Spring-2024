exports.getShoppingCartPage = (req, res) => {
    if (!req.session.user) {
        req.session.alertMessage = "Please login to be able to view your shopping cart!";
        return res.redirect('/login');
    }
    if (req.session.cart){
        return res.render('pages/ShoppingCart', { 
            user: req.session.user, 
            products: req.session.cart.products, 
            quantities: req.session.cart.quantities, 
            total: req.session.cart.total 
        });
    }
    res.render('pages/ShoppingCart', { 
        user: req.session.user, 
        products: {},
        quantities: 0,
        total: 0
    });
};



exports.deleteCartProduct = (req, res) => {
    const productId = req.params.id;
    const cart = req.session.cart;

    if (cart && cart.products) {
        const productIndex = cart.products.findIndex(p => p._id.toString() === productId);

        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);
            cart.quantities.splice(productIndex, 1);

            cart.total = cart.products.reduce((acc, product, index) => {
                return acc + product.price * cart.quantities[index];
            }, 0);

            req.session.cart = cart;
            return res.status(200).send('Product removed from cart');
        }
    }

    res.status(400).send('Product not found in cart');
};

exports.updateQuantity = (req, res) => {
    const { index, quantity } = req.body;
    const cart = req.session.cart;

    if (cart && cart.quantities && cart.quantities.length > index) {
        cart.quantities[index] = quantity;
        cart.total = cart.products.reduce((acc, product, idx) => {
            return acc + product.price * cart.quantities[idx];
        }, 0);

        req.session.cart = cart;
        return res.status(200).send('Quantity updated');
    }

    res.status(400).send('Invalid cart data');
};






