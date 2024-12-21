const express = require("express");
const {
  userData,
  loginUser,
  logOutUser,
} = require("../controller/user.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

// user routes
router.post("/register", userData);
router.post("/login", loginUser);
router.get("/logout", logOutUser);

module.exports = router;
