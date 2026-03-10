const express = require("express");
const router = express.Router();

const contactRoutes = require("./contactRoutes");
const authRoutes = require("./authRoutes");
const propertyRoutes = require("./propertyRoutes");

router.use("/contact", contactRoutes);
router.use("/auth", authRoutes);
router.use("/property", propertyRoutes);

module.exports = router;