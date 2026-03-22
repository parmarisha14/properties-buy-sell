const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true
  },

  brokerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Broker",
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  name: String,
  phone: String,

  date: String,
  time: String,
  message: String,

  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"], 
    default: "pending"
  }

}, { timestamps: true });

module.exports = mongoose.model("Meeting", meetingSchema);