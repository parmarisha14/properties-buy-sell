const Admin = require("../models/AdminModel");
const bcrypt = require("bcrypt");

// ================= CHANGE PASSWORD =================
exports.changePassword = async (req, res) => {
  try {
    const adminId = req.session.user?._id;
    const { currentPassword, newPassword } = req.body;

    if (!adminId) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is wrong" });
    }

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;
    await admin.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    console.log("CHANGE PASSWORD ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ================= LOGOUT =================
exports.logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Logout failed",
        });
      }

      res.clearCookie("connect.sid");

      return res.json({
        success: true,
        message: "Admin logged out successfully",
      });
    });
  } catch (error) {
    console.log("LOGOUT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};