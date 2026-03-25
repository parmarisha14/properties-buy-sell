const User = require("../models/UserModel");
const Broker = require("../models/BrokerModel");
const Admin = require("../models/AdminModel");
const Property = require("../models/PropertyModel");
const bcrypt = require("bcrypt");

exports.signupUser = async (req, res) => {
  try {
    const { fullName, email, phone, dob, password } = req.body;

    if (!fullName || !email || !phone || !dob || !password)
      return res.status(400).json({ message: "All fields are required" });

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
      role: "user",
      profileImage: "default-user.png",
      gender: "",
      address: "",
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

exports.signupBroker = async (req, res) => {
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
      role: "broker",
      brokerImage: "default-user.png",
      gender: "",
      address: "",
    });

    res.status(201).json({ message: "Broker registered successfully", broker });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Broker registration failed", error: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email & Password required",
      });
    }

    let user = await User.findOne({ email });
    if (!user) user = await Broker.findOne({ email });
    if (!user) user = await Admin.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    let isMatch = false;

    if (user.password && user.password.startsWith("$2b$")) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      isMatch = password === user.password;
    }

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    req.session.user = {
      _id: user._id,
      fullName: user.fullName || user.name,
      email: user.email,
      role: user.role,
    };

    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ message: "Session error" });
      }

      res.json({
        success: true,
        message: "Login successful",
        user: req.session.user,
      });
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
};
exports.me = (req, res) => {
  if (req.session.user) {
    return res.json({ success: true, user: req.session.user });
  }
  return res.status(401).json({ success: false, message: "Not logged in" });
};

exports.getProfile = async (req, res) => {
  try {
    const sessionUser = req.session.user;

    if (!sessionUser) {
      return res.status(401).json({ message: "Not logged in" });
    }

    let user;

    if (sessionUser.role === "user") {
      user = await User.findById(sessionUser._id).select("-password");
    } else if (sessionUser.role === "broker") {
      user = await Broker.findById(sessionUser._id).select("-password");
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      ...user.toObject(),
      role: sessionUser.role,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};

exports.getSingleBroker = async (req, res) => {
  try {
    const broker = await Broker.findById(req.params.id);

    if (!broker) {
      return res.status(404).json({
        success: false,
        message: "Broker not found",
      });
    }

    res.status(200).json({
      success: true,
      broker,
    });
  } catch (error) {
    console.log("GET SINGLE BROKER ERROR:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.session.user._id;

    if (!userId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    let updateData = req.body;

    if (updateData.email) {
      const existingUser = await User.findOne({
        email: updateData.email,
        _id: { $ne: userId },
      });

      const existingBroker = await Broker.findOne({
        email: updateData.email,
        _id: { $ne: userId },
      });

      if (existingUser || existingBroker) {
        return res.status(400).json({ message: "Email already in use" });
      }

      req.session.user.email = updateData.email;
    }

    if (req.body.languages) {
      if (typeof req.body.languages === "string") {
        updateData.languages = req.body.languages.split(",");
      }
    }

    if (req.body.businessHours) {
      try {
        updateData.businessHours = JSON.parse(req.body.businessHours);
      } catch (err) {
        console.log("Business Hours Parse Error:", err);
      }
    }

    if (req.file) {
      if (req.session.user.role === "broker") {
        updateData.brokerImage = req.file.filename;
      } else {
        updateData.profileImage = req.file.filename;
      }
    }

    let updatedUser;

    if (req.session.user.role === "user") {
      updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });
    } else {
      updatedUser = await Broker.findByIdAndUpdate(userId, updateData, {
        new: true,
      });
    }

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Profile update failed",
      error: error.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const { currentPassword, newPassword } = req.body;

    let user;
    if (req.session.user.role === "user") {
      user = await User.findById(userId);
    } else {
      user = await Broker.findById(userId);
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match)
      return res.status(400).json({ message: "Current password wrong" });

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    await user.save();

    res.json({ message: "Password changed successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to change password" });
  }
};

exports.logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }

      res.clearCookie("connect.sid", {
        path: "/",
        domain: ".localhost",
        httpOnly: true,
      });
      res.json({ message: "Logged out successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};
exports.getAllBrokers = async (req, res) => {
  try {
    const brokers = await Broker.find();

    res.status(200).json({
      success: true,
      brokers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);

  res.json({ message: "User deleted" });
};

exports.deleteBroker = async (req, res) => {
  try {
    const brokerId = req.params.id;

    const broker = await Broker.findById(brokerId);

    if (!broker) {
      return res.status(404).json({
        success: false,
        message: "Broker not found",
      });
    }

    await Property.deleteMany({ brokerId });

    await Broker.findByIdAndDelete(brokerId);

    return res.status(200).json({
      success: true,
      message: "Broker deleted successfully",
    });
  } catch (error) {
    console.log("DELETE BROKER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while deleting broker",
      error: error.message,
    });
  }
};
