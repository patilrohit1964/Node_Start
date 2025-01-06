const User = require("../models/user.model");
const createOtp = require("../utils/otpGenerator");
const sendMail = require("../utils/sendEmail");
const sendToken = require("../utils/sendToken");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.userData = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  // const hashedPassword = await bcrypt.hash(password, 10);
  // const user = await User.create({
  //   email,
  //   password: hashedPassword,
  //   name,
  // });
  const { otp, token } = createOtp({ name, email, password });
  const htmlTemplate = await ejs.renderFile(
    __dirname + "/views/verifyOtp.ejs",
    { otp, name }
  );
  const emailResult = await sendMail(email, htmlTemplate);
  if (emailResult) {
    res.status(200).cookie("verifyToken", token).json({
      message: "Otp Send On Email Successfuly",
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Failed to Send Otp",
    });
  }
};

exports.otpVerifier = async (req, res) => {
  const { otp } = req.body;
  const { verifyToken } = req.cookies;
  if (!otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }
  const decoded = jwt.verify(token,process.env.JWT_SECRET);
  console.log(decoded)
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }
  const isMatch = await bcrypt.compare(password, user?.password);
  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid password",
    });
  }
  sendToken(res, user, `Welcome ${user?.name}`);
};

exports.logOutUser = async (req, res) => {
  try {
    return res.status(200).clearCookie("token").json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.id,
      {
        name,
        profilePic: req?.files?.file[0]?.filename,
      },
      { new: true }
    );
    const resetPass = user.toObject();
    delete resetPass.password;
    res.status(200).json({
      success: true,
      user: resetPass,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
