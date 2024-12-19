const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized User",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.id = decoded.id;
  next();
};

module.exports = verifyToken;
