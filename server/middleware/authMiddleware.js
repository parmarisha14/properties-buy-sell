const protect = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
};

const adminOnly = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

module.exports = { protect, adminOnly };
