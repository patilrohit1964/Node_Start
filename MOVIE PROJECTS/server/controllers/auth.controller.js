const validator = require("validator");
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const sendToken = require("../utils/sendToken");

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (typeof email !== "string" || !validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    sendToken(user, res, `Welcome ${username}`);
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
      return res
        .status(401)
        .json({ message: "User not found please register first" });
    }
    sendToken(isUserExist, res, `Welcome back ${isUserExist.username}`);
  } catch (error) {
    res.status(500).json({
      message: "Error logging in user",
      error: error.message,
    });
  }
};
