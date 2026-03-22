const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/meetingController");

router.post("/create", ctrl.createMeeting);

// ✅ IMPORTANT
router.get("/broker", ctrl.getBrokerMeetings);
router.get("/user", ctrl.getUserMeetings);
router.get("/admin", ctrl.getAllMeetings);

// ✅ FIXED ROUTE
router.put("/status/:id", ctrl.updateStatus);

// ✅ DELETE
router.delete("/:id", ctrl.deleteMeeting);

module.exports = router;