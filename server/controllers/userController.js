const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

// 🔹 Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

exports.upload = multer({ storage });

// 🔹 Generate Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { fullName, email, dob, phone, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      dob,
      phone,
      password: hashed,
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "Registration successful",
      token,
      user,
    });
  } catch {
    res.status(500).json({ message: "Registration failed" });
  }
};

// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch {
    res.status(500).json({ message: "Login failed" });
  }
};

// ================= GET PROFILE =================
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

// ================= UPDATE PROFILE =================
exports.updateProfile = async (req, res) => {
  const { fullName, phone, gender } = req.body;

  const updateData = { fullName, phone, gender };

  if (req.file) {
    updateData.image = "uploads/" + req.file.filename;
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    updateData,
    { new: true }
  );

  res.json({
    message: "Profile updated successfully",
    user: updatedUser,
  });
};