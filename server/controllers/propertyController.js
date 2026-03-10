const Property = require("../models/PropertyModel");





exports.addProperty = async (req,res)=>{

  try{

    const brokerId = req.session.user?._id;

    if(!brokerId){
      return res.status(401).json({
        message:"Broker login required"
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

    if(!Array.isArray(features)){
      features=[features];
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
      status:"pending"
    });

    await property.save();

    res.json({ message:"Property Added Successfully" });

  }catch(err){

    console.log(err);

    res.status(500).json({
      message:"Server Error"
    });

  }

};


// GET ALL PROPERTIES (ADMIN)
exports.getProperties = async (req, res) => {
  try {

    const properties = await Property.find().populate("brokerId");

    res.json(properties);

  } catch (error) {

    res.status(500).json({ message: "Server Error" });

  }
};


// GET BROKER PROPERTIES (SESSION BASED)

exports.getBrokerProperties = async (req, res) => {

  try {

    const brokerId = req.session.user?._id;

    if (!brokerId) {
      return res.status(401).json({
        message: "Broker login required"
      });
    }

    const properties = await Property.find({ brokerId });

    res.json(properties);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};


// APPROVE PROPERTY
exports.approveProperty = async (req, res) => {

  try {

    await Property.findByIdAndUpdate(req.params.id, {
      status: "approved"
    });

    res.json({ message: "Property Approved" });

  } catch (error) {

    res.status(500).json({ message: "Server Error" });

  }
};


// REJECT PROPERTY
exports.rejectProperty = async (req, res) => {

  try {

    await Property.findByIdAndUpdate(req.params.id, {
      status: "rejected"
    });

    res.json({ message: "Property Rejected" });

  } catch (error) {

    res.status(500).json({ message: "Server Error" });

  }
};


// GET APPROVED PROPERTIES (USER WEBSITE)
exports.getApprovedProperties = async (req, res) => {

  try {

    const properties = await Property.find({
      status: "approved"
    }).populate("brokerId");

    res.json(properties);

  } catch (error) {

    res.status(500).json({ message: "Server Error" });

  }
};


// DELETE PROPERTY
exports.deleteProperty = async (req, res) => {

  try {

    await Property.findByIdAndDelete(req.params.id);

    res.json({ message: "Property Deleted" });

  } catch (error) {

    res.status(500).json({ message: "Server Error" });

  }
};