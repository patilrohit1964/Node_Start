const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["Authorization"].split(" ")[1];
    console.log(token,"iam token");
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Token is required User unauthorized",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded?.id;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
      error: error.message,
    });
  }
};

module.exports = verifyToken;
