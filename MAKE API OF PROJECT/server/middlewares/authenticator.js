const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const authenticator = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  req.user = user;
  next();
};

module.exports = authenticator;
