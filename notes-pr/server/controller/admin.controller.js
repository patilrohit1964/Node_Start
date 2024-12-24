const User = require("../models/user.model");

exports.getAdminUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json({
      users,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
    });
  }
};

exports.deleteAdminUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({
      message: "User deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
    });
  }
};

exports.updateAdminUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body);
    res.status(200).json({
      message: "User updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
    });
  }
};

exports.addAdminUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({
      message: "User added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding user",
    });
  }
};
