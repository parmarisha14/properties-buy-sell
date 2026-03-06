const User = require("../models/BrokerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// REGISTER BROKER
exports.registerBroker = async (req, res) => {

  try {

    const { name, email, phone, agency, rera, password } = req.body;

    const exist = await User.findOne({ email });

    if (exist) {
      return res.json({
        success: false,
        message: "Email already exists"
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      agency,
      rera,
      password: hash,
      role: "broker"
    });

    await newUser.save();

    res.json({
      success: true,
      message: "Broker Registered Successfully"
    });

  } catch (err) {

    res.json({
      success: false,
      message: err.message
    });

  }

};


// LOGIN
exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({
        success: false,
        message: "Invalid Password"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      token,
      role: user.role,
      user
    });

  } catch (err) {

    res.json({
      success: false,
      message: err.message
    });

  }

};