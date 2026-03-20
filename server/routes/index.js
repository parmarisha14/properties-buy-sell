const express = require("express");
const router = express.Router();

const contactRoutes = require("./contactRoutes");
const authRoutes = require("./authRoutes");
const propertyRoutes = require("./propertyRoutes");

// ✅ FIXED PATH
const inquiryRoutes = require("./inquiryRoutes");

router.use("/contact", contactRoutes);
router.use("/auth", authRoutes);
router.use("/property", propertyRoutes);
router.use("/inquiry", inquiryRoutes);

module.exports = router;