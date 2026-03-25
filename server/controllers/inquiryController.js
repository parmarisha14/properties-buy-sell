const Inquiry = require("../models/InquiryModel");

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

exports.getBrokerInquiries = async (req, res) => {
  try {
    const brokerId = req.session.user?._id;

    const inquiries = await Inquiry.find({ brokerId })
      .populate("userId", "fullName email phone profileImage")
      .populate("propertyId", "name price location image")
      .populate("brokerId", "name phone brokerImage");

    res.json({ success: true, inquiries });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getUserInquiries = async (req, res) => {
  try {
    const userId = req.session.user?._id;

    const inquiries = await Inquiry.find({ userId })
      .populate("propertyId", "name price location image city state")
      .populate("brokerId", "name phone brokerImage");

    res.json({ success: true, inquiries });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after" },
    );

    res.json({ success: true, inquiry });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteInquiry = async (req, res) => {
  try {
    const user = req.session.user;

    if (!user) {
      return res.status(401).json({ message: "Login required" });
    }

    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: "Not found" });
    }

    if (
      inquiry.brokerId.toString() !== user._id.toString() &&
      user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Inquiry.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
      .populate("userId", "fullName email phone profileImage")
      .populate("brokerId", "name phone brokerImage")
      .populate("propertyId", "name price location image city state");

    res.json({ success: true, inquiries });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
