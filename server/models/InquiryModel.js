const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },

    brokerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Broker",
    },

    name: String,
    email: String,
    phone: String,
    date: String,
    message: String,

    status: {
     type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);