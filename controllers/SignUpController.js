const bcrypt = require('bcryptjs');
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
    let { name, email, password, confpassword, birthdate, gender } =
      req.body;
    email = email.toLowerCase();
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

    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    const isValidDate = (dateString) => {
      const [year, month, day] = dateString.split("-");
      return dateRegex.test(`${month}/${day}/${year}`);
    };

    if (!birthdate || !isValidDate(birthdate)) {
      errors.birthdate = "Please enter a valid date in MM/DD/YYYY format";
    }else {
      const [year, month, day] = birthdate.split("-");
      birthdate = new Date(year, month - 1, day); 
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
      const defaultShirtImg = "https://www.manutd.com/assets/images/bg/t-shirt.png";
      const newUser = new User({
        name,
        email,
        password: hashedPassword, // Save the hashed password
        gender,
        type: "User",
        birthdate, 
        shirtNumber: 0,
        shirtName: name.split(' ')[0],
        shirtImg: defaultShirtImg,
        purchasedProducts: [],
        purchasedTickets: []
      });

      if (req.files && req.files.image) {
        newUser.image = req.files.image[0].filename;
      }

      console.log("Saving new user:", newUser);

      await newUser.save();
      console.log("User saved successfully");
      res.redirect('/login');
    } catch (error) {
      // console.error("Error saving user:", error);
      // res.status(500).send("Server error");
      errors.email = "Email is already used";
      return res.render("pages/SignUp", { errors, get: false, user: req.session.user });
    }
  });
};

function isValidEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
