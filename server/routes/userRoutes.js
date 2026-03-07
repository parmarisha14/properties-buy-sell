const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  upload,
  getAllUsers,
  deleteUser,
  changePassword
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

// ✅ Get logged-in user profile
router.get("/profile", protect, getProfile);

// ✅ Update profile with image
router.put("/profile", protect, upload.single("profileImage"), updateProfile);

// ✅ Change password
router.put("/change-password", protect, changePassword);

// ✅ Admin routes
router.get("/all", getAllUsers);
router.delete("/delete/:id", deleteUser);

module.exports = router;