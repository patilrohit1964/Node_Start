const validator = require("validator");
exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  if (role) {
    return res.status(400).json({
      message: "role is not required for this request",
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      message: "Invalid email",
    });
  }
};

exports.loginUser = async (req, res) => {
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
};
