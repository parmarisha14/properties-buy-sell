const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { protect } = require("../middleware/authMiddleware");

const {
  signupUser,
  signupBroker,
  me,
  signin,
  getProfile,
  updateUserProfile,
  changePassword,
  logout,
  getAllUsers,
  getAllBrokers,
  deleteUser,
  deleteBroker,getSingleBroker
} = require("../controllers/authController");

// ================= REGISTER =================
router.post("/register-user", signupUser);
router.post("/register-broker", signupBroker);
router.get("/me", me);

// ================= LOGIN =================
router.post("/login", signin);



// ================= PROFILE =================
router.get("/profile", protect, getProfile);

// ================= UPDATE PROFILE =================
router.put(
  "/profile",
  protect,
  upload.single("image"),
  updateUserProfile
);

// ================= CHANGE PASSWORD =================
router.put("/change-password", protect, changePassword);

// ================= LOGOUT =================
router.post("/logout", logout);

// ================= ADMIN APIs =================
router.get("/all-users", getAllUsers);
router.get("/all-brokers", getAllBrokers);
router.get("/broker/:id", getSingleBroker);
router.delete("/delete-user/:id", deleteUser);
router.delete("/delete-broker/:id", deleteBroker);

module.exports = router;