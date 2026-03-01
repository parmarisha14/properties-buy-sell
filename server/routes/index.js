const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");

// ✅ All Auth Routes
router.use("/auth", userRoutes);

module.exports = router;