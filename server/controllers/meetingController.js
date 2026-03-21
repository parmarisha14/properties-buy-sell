const Meeting = require("../models/Meeting");

// CREATE MEETING (Broker)
exports.createMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.create(req.body);
    res.status(201).json(meeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL MEETINGS (User/Broker)
exports.getMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find()
      .populate("propertyId")
      .populate("brokerId")
      .populate("userId");

    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE STATUS (Confirm / Cancel)
exports.updateMeetingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(meeting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};