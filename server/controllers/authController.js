const User = require("../models/UserModel");
const Broker = require("../models/BrokerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// ================= USER REGISTER =================
exports.register = async (req, res) => {
  try {

    const { fullName, email, phone, dob, password } = req.body;

    const userExists = await User.findOne({ email });
    const brokerExists = await Broker.findOne({ email });

    if (userExists || brokerExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      phone,
      dob,
      password: hashedPassword,
      role: "user"
    });

    res.json({
      message: "User registered successfully",
      user
    });

  } catch (err) {

    res.status(500).json({
      message: "Registration failed",
      error: err.message
    });

  }
};


// ================= BROKER REGISTER =================
exports.registerBroker = async (req, res) => {
  try {

    const { name, email, phone, agency, rera, password } = req.body;

    const userExists = await User.findOne({ email });
    const brokerExists = await Broker.findOne({ email });

    if (userExists || brokerExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const broker = await Broker.create({
      name,
      email,
      phone,
      agency,
      rera,
      password: hashedPassword,
      role: "broker"
    });

    res.json({
      message: "Broker registered successfully",
      broker
    });

  } catch (err) {

    res.status(500).json({
      message: "Broker registration failed",
      error: err.message
    });

  }
};


// ================= LOGIN =================
exports.login = async (req, res) => {
  try {

    const { email, password, role } = req.body;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    // ===== ADMIN LOGIN =====
    if (role === "admin") {

      if (email === "admin@gmail.com" && password === "admin123") {

        const token = jwt.sign(
          { role: "admin" },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );

        return res.json({
          token,
          role: "admin",
          user: {
            fullName: "Admin",
            email: "admin@gmail.com"
          }
        });

      }

      return res.status(400).json({ message: "Invalid admin credentials" });

    }

    let user;

    // ===== USER LOGIN =====
    if (role === "user") {

      user = await User.findOne({ email });

      if (!user)
        return res.status(400).json({ message: "User not found" });

    }

    // ===== BROKER LOGIN =====
    if (role === "broker") {

      user = await Broker.findOne({ email });

      if (!user)
        return res.status(400).json({ message: "Broker not found" });

    }

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userData = {
      _id: user._id,
      fullName: user.fullName || user.name || "User",
      email: user.email,
      role
    };

    res.json({
      token,
      role,
      user: userData
    });

  } catch (err) {

    res.status(500).json({
      message: "Login failed",
      error: err.message
    });

  }
};