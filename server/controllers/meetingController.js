const Meeting = require("../models/MeetingModel");
const Property = require("../models/PropertyModel");

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
      status: "pending",
    });

    res.json({ success: true, meeting });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBrokerMeetings = async (req, res) => {
  try {
    const brokerId = req.session.user?._id;

    const meetings = await Meeting.find({ brokerId })
      .populate("propertyId", "name price location image")
      .populate("userId", "fullName phone email");

    const total = meetings.length;
    const confirmed = meetings.filter((m) => m.status === "confirmed").length;
    const pending = meetings.filter((m) => m.status === "pending").length;
    const cancelled = meetings.filter((m) => m.status === "cancelled").length;

    res.json({
      success: true,
      meetings,
      stats: { total, confirmed, pending, cancelled },
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

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

exports.updateStatus = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );

    res.json({ success: true, meeting });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteMeeting = async (req, res) => {
  try {
    const user = req.session.user;

    if (!user) {
      return res.status(401).json({ message: "Login required" });
    }

    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    if (
      meeting.userId.toString() !== user._id.toString() &&
      meeting.brokerId.toString() !== user._id.toString() &&
      user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Meeting.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Meeting Deleted Successfully",
    });
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
exports.updateInterest = async (req, res) => {
  try {
    const { interested } = req.body;

    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { interested },
      { new: true },
    );

    if (interested === true) {
      await Property.findByIdAndUpdate(meeting.propertyId, {
        status: "sold",
      });
    }

    res.json({ success: true, meeting });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
