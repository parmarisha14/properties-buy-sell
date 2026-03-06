const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

// ================= IMAGE UPLOAD =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

exports.upload = multer({ storage });


exports.register = async (req, res) => {
  try {
    const { fullName, email, phone, dob, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullName,
      email,
      phone,
      dob,
      password: hashedPassword,
    });

    res.json({ message: "Registration Successful" });
  } catch (err) {
    res.status(500).json({ message: "Registration Failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Fixed Admin Login
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

    // ✅ Normal User/Broker Login
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      role: user.role,
      user,
    });

  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
};

// ================= GET PROFILE =================
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

// ================= UPDATE PROFILE =================
exports.updateProfile = async (req, res) => {
  try {
    

    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ message: "User not found" });

 
    user.fullName = req.body.fullName || "";
    user.email = req.body.email || "";
    user.phone = req.body.phone || "";
    user.dob = req.body.dob || null;
    user.gender = req.body.gender || "";
    user.address = req.body.address || "";

    if (req.file) {
      user.profileImage = req.file.filename;
    }

    await user.save();

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Update Failed" });
  }
};

// ================= GET ALL USERS (ADMIN) =================
exports.getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.json({
      success: true,
      users,
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


// ================= DELETE USER =================
exports.deleteUser = async (req, res) => {
  try {

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};