const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]; // Authorization header name should be lowercase
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token is required. User unauthorized.",
      });
    }
    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
