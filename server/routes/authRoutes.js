const express = require("express");
const router = express.Router();

const { register, registerBroker, login } = require("../controllers/authController");

// ✅ User register
router.post("/register", register);

// ✅ Broker register
router.post("/register-broker", registerBroker);

// ✅ Login
router.post("/login", login);

module.exports = router;