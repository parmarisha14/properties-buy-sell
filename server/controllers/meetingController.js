const Meeting = require("../models/MeetingModel");

// CREATE
exports.createMeeting = async (req, res) => {
  try {
    const brokerId = req.session.user?._id;

    if (!brokerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const meeting = await Meeting.create({
      ...req.body,
      brokerId
    });

    res.status(201).json(meeting);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// BROKER MEETINGS
exports.getBrokerMeetings = async (req, res) => {
  try {
    const brokerId = req.session.user._id;

    const data = await Meeting.find({ brokerId })
      .populate("propertyId")
      .populate("userId");

    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

// USER MEETINGS
exports.getUserMeetings = async (req, res) => {
  try {
    const userId = req.session.user._id;

    const data = await Meeting.find({ userId })
      .populate("propertyId")
      .populate("brokerId");

    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};

// UPDATE STATUS
exports.updateStatus = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(meeting);
  } catch (err) {
    res.status(500).json(err);
  }
};
// ADMIN - ALL MEETINGS
exports.getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find()
      .populate("propertyId", "name price location image")
      .populate("userId", "fullName phone profileImage")
      .populate("brokerId", "name phone brokerImage");

    res.json({ success: true, meetings });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};