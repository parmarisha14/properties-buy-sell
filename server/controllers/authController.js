const User = require("../models/UserModel");
const Broker = require("../models/BrokerModel");
const bcrypt = require("bcrypt");

// ================= USER REGISTER =================
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
      address: ""
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

// ================= BROKER REGISTER =================
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
      brokerImage: "default-broker.png",
      gender: "",
      address: ""
    });

    res.status(201).json({ message: "Broker registered successfully", broker });
  } catch (err) {
    res.status(500).json({ message: "Broker registration failed", error: err.message });
  }
};

// ================= LOGIN =================
exports.signin = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!role) return res.status(400).json({ message: "Role is required" });

    // Admin login
    if (role === "admin") {
      if (email === "admin@gmail.com" && password === "admin123") {
        req.session.user = { fullName: "Admin", email, role: "admin" };
        return res.json({ message: "Admin logged in successfully", user: req.session.user });
      }
      return res.status(400).json({ message: "Invalid admin credentials" });
    }

    let user;
    if (role === "user") user = await User.findOne({ email });
    if (role === "broker") user = await Broker.findOne({ email });
    if (!user) return res.status(400).json({ message: `${role} not found` });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    req.session.user = {
      _id: user._id,
      fullName: user.fullName || user.name,
      email: user.email,
      role
    };

    res.json({ message: "Login successful", user: req.session.user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// ================= GET PROFILE =================
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
      role: sessionUser.role
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch profile",
      error: error.message
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


    // ================= LANGUAGES =================

    if (req.body.languages) {

      if (typeof req.body.languages === "string") {
        updateData.languages = req.body.languages.split(",");
      }

    }


    // ================= BUSINESS HOURS =================

    if (req.body.businessHours) {

      try {
        updateData.businessHours = JSON.parse(req.body.businessHours);
      }
      catch (err) {
        console.log("Business Hours Parse Error:", err);
      }

    }


    // ================= IMAGE =================

    if (req.file) {

      if (req.session.user.role === "broker") {
        updateData.brokerImage = req.file.filename;
      }
      else {
        updateData.profileImage = req.file.filename;
      }

    }


    let updatedUser;

    if (req.session.user.role === "user") {

      updatedUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        { returnDocument:"after" }
      );

    }

    else {

      updatedUser = await Broker.findByIdAndUpdate(
        userId,
        updateData,
        { returnDocument:"after" }
      );

    }

    res.json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  }

  catch (error) {

    console.log("PROFILE UPDATE ERROR:", error);

    res.status(500).json({
      message: "Profile update failed",
      error: error.message
    });

  }

};

// ================= CHANGE PASSWORD =================
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

    // Check current password
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).json({ message: "Current password wrong" });

    // Hash new password
    const hashed = await bcrypt.hash(newPassword, 10);

    // Update
    user.password = hashed;
    await user.save();

    res.json({ message: "Password changed successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to change password" });
  }
};

// ================= LOGOUT =================
exports.logout = (req, res) => {
  try {
    // Destroy session
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      // Clear cookie
      res.clearCookie("connect.sid", {
        path: "/",
        domain: ".localhost",
        httpOnly: true
      });
      res.json({ message: "Logged out successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};