const User = require("../models/user.model");
const sendToken = require("../utils/sendToken");
const bcrypt = require("bcryptjs");
exports.userData = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email,
    password: hashedPassword,
    name,
  });

  sendToken(res, user, `Welcome ${user?.name}`);
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
