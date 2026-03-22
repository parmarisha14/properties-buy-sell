const express = require("express");
const router = express.Router();

const propertyController = require("../controllers/propertyController");
const upload = require("../middleware/upload");

router.post("/add", upload.single("image"), propertyController.addProperty);

router.get("/approved", propertyController.getApprovedProperties);

router.get("/locations", propertyController.getLocations);
router.get("/price-range", propertyController.getPriceRange);

router.get("/all", propertyController.getProperties);

router.get("/broker", propertyController.getBrokerProperties);

router.get("/:id", propertyController.getSingleProperty);

router.put(
  "/update/:id",
  upload.single("image"),
  propertyController.updateProperty,
);

router.put("/approve/:id", propertyController.approveProperty);

router.put("/reject/:id", propertyController.rejectProperty);

router.delete("/delete/:id", propertyController.deleteProperty);

module.exports = router;
