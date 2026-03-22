const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/meetingController");

router.post("/create", ctrl.createMeeting);

router.get("/broker", ctrl.getBrokerMeetings);
router.get("/user", ctrl.getUserMeetings);
router.get("/admin", ctrl.getAllMeetings);

router.put("/status/:id", ctrl.updateStatus);

router.delete("/:id", ctrl.deleteMeeting);

module.exports = router;
