const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    dob: Date,
    password: { type: String, required: true },

    gender: String,
    address: String,

    profileImage: {
      type: String,
      default: "default.jpg",
    },

    role: {
      type: String,
      enum: ["user", "broker", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);