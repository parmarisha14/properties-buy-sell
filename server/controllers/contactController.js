const Contact = require("../models/ContactModel");

exports.createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = new Contact({
      name,
      email,
      subject,
      message,
    });

    await contact.save();

    res.json({
      success: true,
      message: "Message Saved Successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteContact = async (req, res) => {
  try {
    const id = req.params.id;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    await Contact.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
