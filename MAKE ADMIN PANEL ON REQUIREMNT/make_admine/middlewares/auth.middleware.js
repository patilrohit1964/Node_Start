// Authentication middleware
function auth(req, res, next) {
  const { role, pass } = req.headers;
  if (role === "admin" && pass === "saveEarth") {
    return next();
  }
  res.status(403).json({ message: "Not Authorized" });
}

module.exports = auth;
