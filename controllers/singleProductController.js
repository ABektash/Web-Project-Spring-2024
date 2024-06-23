const Product = require('../models/Product');

exports.getSingleProductWomen = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        const womenProducts = await Product.find({ category: 'Women' });

        const uniqueProducts = womenProducts.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name);
            if (!x) {
                acc.push(current);
            }
            return acc;
        }, []);

        const sameSectionProducts = uniqueProducts.filter(p => {
            return p.section === product.section && p.name !== product.name;
        });

        res.render('pages/singleProduct', {
            product,
            errors: {},
            get: true,
            user: req.session.user,
            products: sameSectionProducts
        });
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).send('Server error');
    }
};



exports.getSingleProductMen = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        const menProducts = await Product.find({ category: 'Men' });

        const uniqueProducts = menProducts.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name);
            if (!x) {
                acc.push(current);
            }
            return acc;
        }, []);

        const sameSectionProducts = uniqueProducts.filter(p => {
            return p.section === product.section && p.name !== product.name;
        });

        res.render('pages/singleProduct', {
            product,
            errors: {},
            get: true,
            user: req.session.user,
            products: sameSectionProducts
        });
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).send('Server error');
    }
};



exports.getSingleProductRetro = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        const retroProducts = await Product.find({ category: 'Retro' });

        const uniqueProducts = retroProducts.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name);
            if (!x) {
                acc.push(current);
            }
            return acc;
        }, []);

        const sameSectionProducts = uniqueProducts.filter(p => {
            return p.section === product.section && p.name !== product.name;
        });

        res.render('pages/singleProduct', {
            product,
            errors: {},
            get: true,
            user: req.session.user,
            products: sameSectionProducts
        });
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).send('Server error');
    }
};



exports.getSingleProductCart = async (req, res) => {
    const errors = {};
    const size = req.params.size;
    const inputValue = parseInt(req.params.quantity, 10);

    let product = await Product.findOne({ name: req.params.name, size: size });

    if (!product) {
        errors.error = "Out of Stock!";
        product = await Product.findOne({ name: req.params.name });
        const retroProducts = await Product.find({ category: product.category });

        const uniqueProducts = retroProducts.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name);
            if (!x) {
                acc.push(current);
            }
            return acc;
        }, []);

        const sameSectionProducts = uniqueProducts.filter(p => {
            return p.section === product.section && p.name !== product.name;
        });
        return res.render('pages/singleProduct', {
            product,
            errors,
            get: true,
            user: req.session.user,
            products: sameSectionProducts
        });
    }

    const retroProducts = await Product.find({ category: product.category });

    const uniqueProducts = retroProducts.reduce((acc, current) => {
        const x = acc.find(item => item.name === current.name);
        if (!x) {
            acc.push(current);
        }
        return acc;
    }, []);

    const sameSectionProducts = uniqueProducts.filter(p => {
        return p.section === product.section && p.name !== product.name;
    });

    if (inputValue <= 0 && size === "Select Size") {
        errors.error = "Please select size and add items to the cart!";
    }
    if (inputValue <= 0) {
        errors.error = "Please add items to the cart!";
    }
    if (size === "Select Size") {
        errors.error = "Please select a size!!";
    }
    if (inputValue > product.quantity) {
        errors.error = "This quantity is not available in stock!";
    }
    if (Object.keys(errors).length > 0) {
        return res.render('pages/singleProduct', {
            product,
            errors,
            get: true,
            user: req.session.user,
            products: sameSectionProducts
        });
    }

    req.session.cart = req.session.cart || { products: [], quantities: [], total: 0 };

    const existingProductIndex = req.session.cart.products.findIndex(p => p._id == product._id);

    if (req.session.cart.quantities[existingProductIndex] + inputValue > product.quantity) {
        errors.error = "This quantity is not available in stock!";
        product = await Product.findOne({ name: req.params.name });
        const retroProducts = await Product.find({ category: product.category });

        const uniqueProducts = retroProducts.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name);
            if (!x) {
                acc.push(current);
            }
            return acc;
        }, []);

        const sameSectionProducts = uniqueProducts.filter(p => {
            return p.section === product.section && p.name !== product.name;
        });
        return res.render('pages/singleProduct', {
            product,
            errors,
            get: true,
            user: req.session.user,
            products: sameSectionProducts
        });
    }

    if (existingProductIndex >= 0) {
        req.session.cart.quantities[existingProductIndex] += inputValue;
    } else {
        req.session.cart.products.push(product);
        req.session.cart.quantities.push(inputValue);
    }

    req.session.cart.total = req.session.cart.products.reduce((acc, p, index) => {
        return acc + p.price * req.session.cart.quantities[index];
    }, 0);

    console.log(product);
    console.log(req.session.cart);

    res.render('pages/singleProduct', {
        product,
        errors: {},
        get: false,
        user: req.session.user,
        products: sameSectionProducts
    });
};


