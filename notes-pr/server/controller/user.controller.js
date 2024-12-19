const User = require("../models/user.model");
const sendToken = require("../utils/sendToken");

exports.userData = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const user = await User.create({
    email,
    password,
    name,
  });
  sendToken(res, user, `Welcome ${user?.name}`);
};

exports.getUserNotes = async (req, res) => {
  const user = await User.findById(req.id);
  res.status(200).json({
    success: true,
    user,
  });
};
