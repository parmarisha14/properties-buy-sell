const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const contactRoutes = require("./contactRoutes");
const authRoutes = require("./authRoutes");

router.use("/user", userRoutes);
router.use("/contact", contactRoutes);
router.use("/auth", authRoutes);

module.exports = router;