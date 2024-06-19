const bcrypt = require('bcrypt');
const User = require("../models/User");
const upload = require("../middleware/multer");

exports.getSignUp = (req, res) => {
  res.render("pages/SignUp", { errors: {}, get: true, user: req.session.user });
};

exports.postSignUp = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log("Error during file upload:", err);
      return res.render("pages/SignUp", {
        errors: { image: err.message },
        get: false,
      });
    }
    console.log(req.body);
    const { name, email, password, confpassword, day, month, year, gender } =
      req.body;
    const errors = {};

    if (name == "") {
      errors.name = "Please enter your name";
    } else {
      var regex = /^[a-zA-Z\s]+$/;
      if (regex.test(name) === false) {
        errors.name = "Please enter a valid name";
      }
    }

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

    if (confpassword == "") {
      errors.confpassword = "Please confirm your password";
    } else {
      if (confpassword !== password) {
        errors.confpassword = "Passwords do not match";
      }
    }

    if (day == "" || month == "" || year == "") {
      errors.dob = "Invalid Date of birth";
    }

    if (!gender) {
      errors.gender = "Please select your gender";
    }

    if (Object.keys(errors).length > 0) {
      return res.render("pages/SignUp", { errors, get: false, user: req.session.user });
    }

    try {
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({
        name,
        email,
        password: hashedPassword, // Save the hashed password
        gender,
        type: "User",
        birthdate: new Date(year, month, day), // Note: month is 0-based in JavaScript Date
        points: 0,
        purchasedProducts: [],
        purchasedTickets: [],
      });

      if (req.files && req.files.image) {
        newUser.image = req.files.image[0].filename;
      }

      console.log("Saving new user:", newUser);

      await newUser.save();
      console.log("User saved successfully");
      res.redirect('/Profile');
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).send("Server error");
    }
  });
};

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
