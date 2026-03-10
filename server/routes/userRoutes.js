const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  changePassword
} = require("../controllers/authController");

const upload = require("../middleware/upload");
const { protect } = require("../middleware/authMiddleware");

// ✅ GET Profile
router.get("/profile", protect, getProfile);

// ✅ UPDATE Profile (with optional image)
router.put("/profile", protect, upload.single("profileImage"), updateProfile);

// ✅ CHANGE PASSWORD
router.put("/change-password", protect, changePassword);

module.exports = router;