const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
    },

    dob: {
      type: Date,
    },

    password: {
      type: String,
      required: function () {
        // Google login wale user ke liye password required nahi
        return !this.googleId;
      },
    },

    // 🔐 Google Login Support
    googleId: {
      type: String,
    },

    // 🖼 Profile Image
    profileImage: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },

    role: {
      type: String,
      enum: ["user", "broker", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const user= mongoose.model("User", userSchema);
module.exports = user;