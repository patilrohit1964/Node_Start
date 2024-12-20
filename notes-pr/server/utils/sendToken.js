const jwt = require("jsonwebtoken");

const sendToken = (res, user, message) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return res
    .status(200)
    .cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message,
      user,
    });
};

module.exports = sendToken;
