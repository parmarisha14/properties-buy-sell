const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Ensure folder exists
const ensureFolder = (folderPath) => {
  if (!folderPath) return; // ❗ prevent crash

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {

    let folder = "uploads/others"; // ✅ DEFAULT FIX

    if (file.fieldname === "image") {

      if (req.originalUrl.includes("/property")) {
        folder = "uploads/properties";
      } 
      else if (req.originalUrl.includes("/broker")) {
        folder = "uploads/brokers";
      } 
      else if (req.originalUrl.includes("/user") || req.originalUrl.includes("/auth")) {
        folder = "uploads/users";  // ✅ IMPORTANT FIX
      }
    }

    ensureFolder(folder);
    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;