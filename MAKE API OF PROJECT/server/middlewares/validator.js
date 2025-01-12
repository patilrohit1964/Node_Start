const validator = (req, res, next) => {
  console.log(req.user, "iam from validator");
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = validator;
