const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected ✅");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = db;