const Property = require("../models/PropertyModel");
const Meeting = require("../models/MeetingModel");
exports.addProperty = async (req, res) => {
  try {
    const brokerId = req.session.user?._id;

    if (!brokerId) {
      return res.status(401).json({
        message: "Broker login required",
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
      description,
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
      status: "pending",
    });

    await property.save();

    res.json({
      success: true,
      message: "Property Added Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("brokerId", "name phone");

    res.json({
      success: true,
      properties,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getBrokerProperties = async (req, res) => {
  try {
    const brokerId = req.session.user?._id;

    if (!brokerId) {
      return res.status(401).json({
        message: "Broker login required",
      });
    }

    const properties = await Property.find({ brokerId }).populate(
      "brokerId",
      "name phone image",
    );

    res.json({
      success: true,
      properties,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
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

    let features = req.body.features || [];

    if (typeof features === "string") {
      features = features.split(",").map((f) => f.trim());
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
        returnDocument: "after",
      },
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

exports.approveProperty = async (req, res) => {
  try {
    await Property.findByIdAndUpdate(req.params.id, { status: "approved" });

    res.json({
      message: "Property Approved",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.rejectProperty = async (req, res) => {
  try {
    await Property.findByIdAndUpdate(req.params.id, { status: "rejected" });

    res.json({
      message: "Property Rejected",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getApprovedProperties = async (req, res) => {
  try {
    const { type, minPrice, maxPrice, city, state } = req.query;

    let filter = { status: "approved" };

    if (type) {
      filter.type = type;
    }

    if (minPrice && maxPrice) {
      filter.price = {
        $gte: Number(minPrice),
        $lte: Number(maxPrice),
      };
    }

    if (city) {
      filter.city = city;
    }

    if (state) {
      filter.state = state;
    }

    console.log("FILTER:", filter);

    const properties = await Property.find(filter).populate(
      "brokerId",
      "name phone brokerImage",
    );

    res.json({
      success: true,
      properties,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getLocations = async (req, res) => {
  try {
    const cities = await Property.distinct("city", { status: "approved" });
    const states = await Property.distinct("state", { status: "approved" });

    res.json({
      success: true,
      cities,
      states,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getPriceRange = async (req, res) => {
  try {
    const prices = await Property.find({ status: "approved" }, "price");

    const values = prices.map((p) => p.price);

    if (values.length === 0) {
      return res.json({
        success: true,
        minPrice: 0,
        maxPrice: 0,
      });
    }

    const minPrice = Math.min(...values);
    const maxPrice = Math.max(...values);

    res.json({
      success: true,
      minPrice,
      maxPrice,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.getSingleProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "brokerId",
      "name phone brokerImage",
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.json({
      success: true,
      property,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.approveProperty = async (req, res) => {
  try {
    await Property.findByIdAndUpdate(req.params.id, { status: "approved" });

    res.json({
      message: "Property Approved",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);

    res.json({
      message: "Property Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.markAsSold = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    property.status = "sold";
    await property.save();

    res.json({
      success: true,
      message: "Property marked as SOLD",
      property,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.getSoldPropertiesWithUsers = async (req, res) => {
  try {
    const brokerId = req.session.user?._id;

    const soldProperties = await Property.find({
      brokerId,
      status: "sold",
    });

    const result = [];

    for (let property of soldProperties) {
      const meetings = await Meeting.find({
        propertyId: property._id,
      }).populate("userId", "fullName phone");

      result.push({
        property,
        users: meetings,
      });
    }

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
