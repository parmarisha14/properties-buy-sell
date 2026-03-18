const express = require("express");
const router = express.Router();

const propertyController = require("../controllers/propertyController");
const upload = require("../middleware/upload");


// =====================================
// ADD PROPERTY (Broker)
// Add Property (Broker)
router.post("/add", upload.single("image"), propertyController.addProperty);

// =====================================
// GET ALL PROPERTIES (Admin)
// =====================================
router.get(
  "/all",
  propertyController.getProperties
);


// =====================================
// GET BROKER PROPERTIES
// =====================================
router.get(
  "/broker",
  propertyController.getBrokerProperties
);


// =====================================
// UPDATE PROPERTY (Broker)
// =====================================
router.put(
  "/update/:id",
  upload.single("image"),
  propertyController.updateProperty
);


// =====================================
// APPROVE PROPERTY (Admin)
// =====================================
router.put(
  "/approve/:id",
  propertyController.approveProperty
);


// =====================================
// REJECT PROPERTY (Admin)
// =====================================
router.put(
  "/reject/:id",
  propertyController.rejectProperty
);

// APPROVE PROPERTY
router.put(
  "/approve/:id",
  propertyController.approveProperty
);
router.get("/approved", propertyController.getApprovedProperties);

// =====================================
// DELETE PROPERTY
// =====================================
router.delete(
  "/delete/:id",
  propertyController.deleteProperty
);


module.exports = router;