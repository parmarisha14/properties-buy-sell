const User = require("../models/UserModel");
const Property = require("../models/PropertyModel");
const Inquiry = require("../models/InquiryModel");
const Meeting = require("../models/MeetingModel");
const Broker = require("../models/BrokerModel");
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalBrokers = await Broker.countDocuments({ role: "broker" });

    const totalProperties = await Property.countDocuments();
    const approvedProperties = await Property.countDocuments({
      status: "approved",
    });
    const rejectedProperties = await Property.countDocuments({
      status: "rejected",
    });
    const pendingProperties = await Property.countDocuments({
      status: "pending",
    });

    const totalInquiries = await Inquiry.countDocuments();
    const approvedInquiries = await Inquiry.countDocuments({
      status: "approved",
    });
    const rejectedInquiries = await Inquiry.countDocuments({
      status: "rejected",
    });
    const pendingInquiries = await Inquiry.countDocuments({
      status: "pending",
    });

    const totalMeetings = await Meeting.countDocuments();
    const confirmedMeetings = await Meeting.countDocuments({
      status: "confirmed",
    });
    const cancelledMeetings = await Meeting.countDocuments({
      status: "cancelled",
    });
    const pendingMeetings = await Meeting.countDocuments({ status: "pending" });

    res.json({
      totalUsers,
      totalBrokers,

      totalProperties,
      approvedProperties,
      rejectedProperties,
      pendingProperties,

      totalInquiries,
      approvedInquiries,
      rejectedInquiries,
      pendingInquiries,

      totalMeetings,
      confirmedMeetings,
      cancelledMeetings,
      pendingMeetings,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
