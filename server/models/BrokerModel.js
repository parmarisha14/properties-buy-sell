const mongoose = require("mongoose");

const brokerSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String
  },

  agency: {
    type: String
  },

  rera: {
    type: String
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "broker"
  }

}, { timestamps: true });

const Broker = mongoose.model("Broker", brokerSchema);

module.exports = Broker;