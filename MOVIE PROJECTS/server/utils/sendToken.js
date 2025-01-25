const jwt = require("jsonwebtoken");

const sendToken = (user, res, message) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res
    .status(201)
    .cookie("token", token)
    .json({
      message: message || "User created successfully",
      user,
      token,
      success: true,
    });
};

module.exports = sendToken;
