const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.put("/change-password", adminController.changePassword);

router.get("/logout", adminController.logout);

module.exports = router;
