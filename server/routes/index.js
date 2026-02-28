const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const googleAuth = require("./googleAuth");

// Normal auth routes
router.use("/auth", userRoutes);



module.exports = router;