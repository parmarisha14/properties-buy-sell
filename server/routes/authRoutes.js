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
  deleteBroker,
  getSingleBroker,
} = require("../controllers/authController");

router.post("/register-user", signupUser);
router.post("/register-broker", signupBroker);
router.get("/me", me);

router.post("/login", signin);

router.get("/profile", protect, getProfile);

router.put("/profile", protect, upload.single("image"), updateUserProfile);

router.put("/change-password", protect, changePassword);

router.post("/logout", logout);

router.get("/all-users", getAllUsers);
router.get("/all-brokers", getAllBrokers);
router.get("/broker/:id", getSingleBroker);
router.delete("/delete-user/:id", deleteUser);
router.delete("/delete-broker/:id", deleteBroker);

module.exports = router;
