const express = require("express");
const router = express.Router();

const {
  toggleWishlist,
  getWishlist,
} = require("../controllers/wishlistController");

router.post("/toggle", toggleWishlist);
router.get("/", getWishlist);

module.exports = router;
