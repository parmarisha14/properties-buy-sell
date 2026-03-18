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
  },

  brokerImage: {
    type: String,
    default: "default.png"
  },

  gender: {
    type: String
  },

  address: {
    type: String
  },

  professionalSummary: {
    type: String
  },

  quotes: {
    type: String
  },

  experienceYears: {
    type: Number
  },

  officeLocation: {
    type: String
  },

  languages: [
    {
      type: String
    }
  ],

  businessHours: {

    mondayFriday: {
      type: String
    },

    saturday: {
      type: String
    },

    sunday: {
      type: String
    }

  }

}, { timestamps: true });

const Broker = mongoose.model("Broker", brokerSchema);

module.exports = Broker;