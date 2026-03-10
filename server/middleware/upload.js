const multer = require("multer");
const fs = require("fs");
const path = require("path");

// create folder if not exist
const ensureFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    let baseFolder = path.join(__dirname, "../uploads");
    let folder = baseFolder;

    if (file.fieldname === "image") {
      folder = path.join(baseFolder, "properties");
    } 
    else if (file.fieldname === "userImage") {
      folder = path.join(baseFolder, "users");
    } 
    else if (file.fieldname === "brokerImage") {
      folder = path.join(baseFolder, "brokers");
    }

    ensureFolder(folder);

    cb(null, folder);
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  }

});

const upload = multer({ storage });

module.exports = upload;