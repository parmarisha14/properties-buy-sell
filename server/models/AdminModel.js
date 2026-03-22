const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    fullName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

// ✅ This must match your MongoDB collection name "admins"
module.exports = mongoose.model("Admin", adminSchema, "admins");