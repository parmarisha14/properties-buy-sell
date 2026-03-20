const Inquiry = require("../models/InquiryModel");

// CREATE
exports.createInquiry = async (req, res) => {
  try {
    const userId = req.session.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Login required" });
    }

    const inquiry = await Inquiry.create({
      userId,
      propertyId: req.body.propertyId,
      brokerId: req.body.brokerId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      date: req.body.date,
      message: req.body.message,
    });

    res.json({ success: true, inquiry });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// BROKER INQUIRIES
exports.getBrokerInquiries = async (req, res) => {
  try {
    const brokerId = req.session.user?._id;

    if (!brokerId) {
      return res.status(401).json({ message: "Login required" });
    }

    const inquiries = await Inquiry.find({ brokerId })
      .populate("userId", "fullName email phone")
      .populate("propertyId", "name price location");

    res.json({ success: true, inquiries });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// USER INQUIRIES
exports.getUserInquiries = async (req, res) => {
  try {
    const userId = req.session.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Login required" });
    }

    const inquiries = await Inquiry.find({ userId })
      .populate("propertyId", "name price location")
      .populate("brokerId", "name phone");

    res.json({ success: true, inquiries });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE STATUS
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ success: true, inquiry });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};