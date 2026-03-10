const express = require("express");
const router = express.Router();

const propertyController = require("../controllers/propertyController");
const upload = require("../middleware/upload");

router.post(
  "/add",
  upload.single("image"),
  propertyController.addProperty
);

// GET ALL PROPERTIES
router.get("/all", propertyController.getProperties);

router.get("/broker", propertyController.getBrokerProperties);

// APPROVE PROPERTY
router.put("/approve/:id", propertyController.approveProperty);

// REJECT PROPERTY
router.put("/reject/:id", propertyController.rejectProperty);

// GET APPROVED PROPERTIES
router.get("/approved", propertyController.getApprovedProperties);

// DELETE PROPERTY
router.delete("/delete/:id", propertyController.deleteProperty);

module.exports = router;