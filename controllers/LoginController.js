const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.getLogin = (req, res) => {
  res.render('pages/Login', { errors: {}, get: true });
};

exports.postLogin = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const errors = {};

  if (email == "") {
    errors.email = "Please enter your email address";
  } else {
    var regex = /^\S+@\S+\.\S+$/;
    if (regex.test(email) === false) {
      errors.email = "Please enter a valid email address";
    }
  }

  if (password == "") {
    errors.password = "Please enter a password";
  } else {
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.render('pages/Login', { errors, get: false });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      errors.email = "No account found with this email";
      return res.render('pages/Login', { errors, get: false });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      errors.password = "Incorrect password";
      return res.render('pages/Login', { errors, get: false });
    }

    // Redirect based on user type
    if (user.type === 'Admin') {
      return res.redirect('/dashboard');
    } else {
      return res.redirect('/');
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send('Server error');
  }
};
