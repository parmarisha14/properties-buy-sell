const Wishlist = require("../models/WishlistModel");


exports.toggleWishlist = async (req, res) => {
  try {
    const userId = req.session.user?._id;
    const { propertyId } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Login required" });
    }

    const exist = await Wishlist.findOne({ userId, propertyId });

    if (exist) {
      await Wishlist.findByIdAndDelete(exist._id);
      return res.json({ success: true, action: "removed" });
    }

    await Wishlist.create({ userId, propertyId });

    res.json({ success: true, action: "added" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const userId = req.session.user?._id;

    if (!userId) {
      return res.json({ success: true, list: [] });
    }

    const list = await Wishlist.find({ userId })
      .populate({
        path: "propertyId",
        populate: {
          path: "brokerId",
          model: "User",
          select: "name email phone"
        }
      });

    // 🔥 REMOVE NULL properties
    const cleanList = list.filter(
      (item) => item.propertyId !== null
    );

    res.json({ success: true, list: cleanList });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};