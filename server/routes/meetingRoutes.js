const express = require("express");
const router = express.Router();

const {
  createMeeting,
  getMeetings,
  updateMeetingStatus
} = require("../controllers/meetingController");

router.post("/create", createMeeting);
router.get("/", getMeetings);
router.put("/status/:id", updateMeetingStatus);

module.exports = router;