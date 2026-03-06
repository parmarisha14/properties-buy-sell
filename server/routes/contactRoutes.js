const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController");

// save contact
router.post("/", contactController.createContact);

// get contacts (admin)
router.get("/", contactController.getContacts);

module.exports = router;