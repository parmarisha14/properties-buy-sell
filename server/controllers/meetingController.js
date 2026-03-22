const Meeting = require("../models/MeetingModel");

// CREATE
exports.createMeeting = async (req, res) => {
  try {
    const brokerId = req.session.user?._id;

    if (!brokerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const meeting = await Meeting.create({
      propertyId: req.body.propertyId,
      userId: req.body.userId,
      brokerId,
      date: req.body.date,
      time: req.body.time,
      message: req.body.message,
      status: "pending"
    });

    res.json({ success: true, meeting });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// BROKER
exports.getBrokerMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({ brokerId: req.session.user._id })
      .populate("propertyId", "name price location image")
      .populate("userId", "fullName phone email profileImage")
      .populate("brokerId", "name phone email brokerImage");

    res.json({ success: true, meetings });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// USER
exports.getUserMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({ userId: req.session.user._id })
      .populate("propertyId", "name price location image")
      .populate("brokerId", "name phone email brokerImage");

    res.json({ success: true, meetings });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// STATUS UPDATE
exports.updateStatus = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json({ success: true, meeting });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE
exports.deleteMeeting = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const role = req.session.user.role;

    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) return res.status(404).json({ message: "Not found" });

    if (
      role !== "admin" &&
      meeting.userId.toString() !== userId.toString() &&
      meeting.brokerId.toString() !== userId.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Meeting.findByIdAndDelete(req.params.id);

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find()
      .populate("propertyId", "name price location image")
      .populate("userId", "fullName phone email profileImage")
      .populate("brokerId", "name phone email brokerImage");

    res.json({ success: true, meetings });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};