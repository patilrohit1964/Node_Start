const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const verifyToken = async (req, res, next) => {
  try {
    const { token } = req.cookies; // Authorization header name should be lowercase
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is required. User unauthorized.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      res.status(401).json({
        success: false,
        message: "Invalid token",
        error: error.message,
      });
    }
    const user = await User.findById(decoded?.id);
    if (!user) {
      res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    req.user = decoded?.id; // Store decoded user ID in request
    next(); // Proceed to the next middleware
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token",
      error: error.message,
    });
  }
};

module.exports = verifyToken;
