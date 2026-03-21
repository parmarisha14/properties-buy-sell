const express = require("express");
const router = express.Router();

const propertyController = require("../controllers/propertyController");
const upload = require("../middleware/upload");

// =====================================
// ADD PROPERTY (Broker)
// =====================================
router.post(
  "/add",
  upload.single("image"),
  propertyController.addProperty
);

// =====================================
// GET APPROVED PROPERTIES (USER WEBSITE)
// ⚠️ IMPORTANT: always keep BEFORE :id route
// =====================================
router.get(
  "/approved",
  propertyController.getApprovedProperties
);

router.get("/locations", propertyController.getLocations);
router.get("/price-range", propertyController.getPriceRange);
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
// GET SINGLE PROPERTY
// ⚠️ ALWAYS KEEP LAST (dynamic route)
// =====================================
router.get(
  "/:id",
  propertyController.getSingleProperty
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

// =====================================
// DELETE PROPERTY
// =====================================
router.delete(
  "/delete/:id",
  propertyController.deleteProperty
);

module.exports = router;