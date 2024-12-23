const User = require("../models/user.model");

exports.getAdminUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Error fetching users" 
    });
  }
};

exports.deleteAdminUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false, 
      message: "Error deleting user"
    });
  }
};

exports.updateAdminUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user"
    });
  }
};


