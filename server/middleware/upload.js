const multer = require("multer");
const path = require("path");
const fs = require("fs");

// create folder if not exist
const ensureFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    let folder = "uploads/properties";

    // Broker profile image
    if (file.fieldname === "image" && req.session.user.role === "broker") {
      folder = "uploads/brokers";
    }

    // User profile image
    if (file.fieldname === "image" && req.session.user.role === "user") {
      folder = "uploads/users";
    }

    ensureFolder(folder);

    cb(null, folder);
  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() + "-" + file.originalname.replace(/\s+/g, "_");

    cb(null, uniqueName);
  }

});

const upload = multer({ storage });

module.exports = upload;