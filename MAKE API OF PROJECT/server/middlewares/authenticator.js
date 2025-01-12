const bcrypt = require("bcryptjs"); // Use bcrypt for password comparison
const jwt = require("jsonwebtoken"); // JWT for generating tokens
const User = require("../models/user.model"); // Adjust the path to where your User model is located

// Function to authenticate user during login
const authenticateUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      throw new Error("User not found");
    }
    req.user = payload;
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    res
      .status(500)
      .json({ message: "An error occurred during authentication" });
  }
};

module.exports = authenticateUser;
