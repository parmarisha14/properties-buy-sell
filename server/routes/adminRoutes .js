const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

// 🔐 Change Password
router.put("/change-password", adminController.changePassword);

// 🚪 Logout
router.get("/logout", adminController.logout);

module.exports = router;