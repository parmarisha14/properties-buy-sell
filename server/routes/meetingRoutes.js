const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/meetingController");

router.post("/create", ctrl.createMeeting);

router.get("/broker", ctrl.getBrokerMeetings);
router.get("/user", ctrl.getUserMeetings);

router.put("/status/:id", ctrl.updateStatus);
router.get("/admin", ctrl.getAllMeetings);
module.exports = router;