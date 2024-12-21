const jwt = require("jsonwebtoken");

const sendToken = (res, user, message) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  return res.status(200).cookie("token", token, options).json({
    success: true,
    message,
    user,
    token,
  });
};

module.exports = sendToken;
