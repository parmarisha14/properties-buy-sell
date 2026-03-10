const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { protect } = require("../middleware/authMiddleware");
const {
  signupUser,
  signupBroker,
  signin,
  getProfile,
  updateUserProfile,
  changePassword,
  logout
} = require("../controllers/authController");

// REGISTER
router.post("/register-user", signupUser);
router.post("/register-broker", signupBroker);

// LOGIN
router.post("/login", signin);

// PROFILE (Added /me endpoint for frontend compatibility)
router.get("/profile", protect, getProfile);
router.get("/me", protect, getProfile); // This is what frontend calls
router.put("/profile", protect, upload.single("userImage"), updateUserProfile);

// CHANGE PASSWORD
router.put("/change-password", protect, changePassword);

// LOGOUT
router.post("/logout", logout);

module.exports = router;