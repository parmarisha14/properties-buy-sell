const express = require("express");
const router = express.Router();

const contactRoutes = require("./contactRoutes");
const authRoutes = require("./authRoutes");
const propertyRoutes = require("./propertyRoutes");
const wishlistRoutes = require("./wishlistRoutes");
const inquiryRoutes = require("./inquiryRoutes");
const meetingRoutes = require("./meetingRoutes");

router.use("/contact", contactRoutes);
router.use("/auth", authRoutes);
router.use("/property", propertyRoutes);
router.use("/inquiry", inquiryRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/meeting", meetingRoutes);
module.exports = router;