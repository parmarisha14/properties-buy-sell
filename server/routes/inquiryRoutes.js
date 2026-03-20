const express = require("express");
const router = express.Router();

const {
  createInquiry,
  getBrokerInquiries,
  getUserInquiries,
  updateStatus,
} = require("../controllers/inquiryController");

router.post("/", createInquiry);

router.get("/broker", getBrokerInquiries);
router.get("/user", getUserInquiries);

router.put("/:id", updateStatus);

module.exports = router;