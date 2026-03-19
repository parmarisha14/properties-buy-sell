const Property = require("../models/PropertyModel");


// ===============================
// ADD PROPERTY (Broker)
// ===============================
exports.addProperty = async (req, res) => {

  try {

    const brokerId = req.session.user?._id;

    if (!brokerId) {
      return res.status(401).json({
        message: "Broker login required"
      });
    }

    const {
      name,
      price,
      location,
      city,
      state,
      bedroom,
      bathroom,
      area,
      year,
      type,
      description
    } = req.body;

    let features = req.body.features || [];

    if (!Array.isArray(features)) {
      features = [features];
    }

    const image = req.file ? req.file.filename : null;

    const property = new Property({
      name,
      price,
      location,
      city,
      state,
      bedroom,
      bathroom,
      area,
      year,
      type,
      description,
      features,
      image,
      brokerId,
      status: "pending"
    });

    await property.save();

    res.json({
      success: true,
      message: "Property Added Successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};



// ===============================
// GET ALL PROPERTIES (ADMIN)
// ===============================
// ===============================
// GET ALL PROPERTIES (ADMIN)
// ===============================
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property
      .find()
      .populate("brokerId", "name phone"); // ✅ Populate broker name & phone

    res.json({
      success: true,
      properties
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};



// ===============================
// GET BROKER PROPERTIES
// ===============================
// ===============================
// GET BROKER PROPERTIES
// ===============================
// ===============================
// GET BROKER PROPERTIES
// ===============================
// ===============================
// GET BROKER PROPERTIES
// ===============================
exports.getBrokerProperties = async (req, res) => {
  try {
    const brokerId = req.session.user?._id;

    if (!brokerId) {
      return res.status(401).json({
        message: "Broker login required"
      });
    }

    // ✅ Populate broker name & phone for each property
    const properties = await Property
      .find({ brokerId })
      .populate("brokerId", "name phone image");

    res.json({
      success: true,
      properties
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};



exports.updateProperty = async (req, res) => {
  try {
    const brokerId = req.session.user?._id;

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (property.brokerId.toString() !== brokerId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // ================= FEATURES FIX =================
    let features = req.body.features || [];

    if (typeof features === "string") {
      features = features.split(",").map(f => f.trim());
    }

    const updatedData = {
      name: req.body.name,
      price: req.body.price,
      location: req.body.location,
      city: req.body.city,
      state: req.body.state,
      bedroom: req.body.bedroom,
      bathroom: req.body.bathroom,
      area: req.body.area,
      year: req.body.year,
      type: req.body.type,
      description: req.body.description,
      features,
    };

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        returnDocument: "after" // ✅ FIX MONGOOSE WARNING
      }
    );

    res.json({
      success: true,
      message: "Property Updated Successfully",
      property: updated,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// ===============================
// APPROVE PROPERTY (ADMIN)
// ===============================
exports.approveProperty = async (req, res) => {

  try {

    await Property.findByIdAndUpdate(
      req.params.id,
      { status: "approved" }
    );

    res.json({
      message: "Property Approved"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

};



// ===============================
// REJECT PROPERTY (ADMIN)
// ===============================
exports.rejectProperty = async (req, res) => {

  try {

    await Property.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" }
    );

    res.json({
      message: "Property Rejected"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

};



// ===============================
// GET APPROVED PROPERTIES (USER WEBSITE)
// ===============================
// ===============================
// GET APPROVED PROPERTIES (WEBSITE)
// ===============================
exports.getApprovedProperties = async (req, res) => {
  try {

    const properties = await Property
      .find({ status: "approved" }) // ✅ only approved
      .populate("brokerId", "name phone brokerImage"); // ✅ dynamic broker data

    res.json({
      success: true,
      properties
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};
exports.getSingleProperty = async (req, res) => {
  try {

    const property = await Property
      .findById(req.params.id)
      .populate("brokerId", "name phone brokerImage");

    if (!property) {
      return res.status(404).json({
        message: "Property not found"
      });
    }

    res.json({
      success: true,
      property
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

// ===============================
// APPROVE PROPERTY
// ===============================
exports.approveProperty = async (req, res) => {
  try {

    await Property.findByIdAndUpdate(
      req.params.id,
      { status: "approved" }
    );

    res.json({
      message: "Property Approved"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};


// ===============================
// DELETE PROPERTY
// ===============================
exports.deleteProperty = async (req, res) => {

  try {

    await Property.findByIdAndDelete(req.params.id);

    res.json({
      message: "Property Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

};