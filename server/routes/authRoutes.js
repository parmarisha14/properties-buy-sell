const express = require("express");
const router = express.Router();

const { registerBroker, login } = require("../controllers/authController");

router.post("/register-broker", registerBroker);
router.post("/login", login);

module.exports = router;