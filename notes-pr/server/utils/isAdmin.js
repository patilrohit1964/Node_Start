const User = require("../models/user.model");
const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.id);
  if (user.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = isAdmin;
