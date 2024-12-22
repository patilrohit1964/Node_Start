const express = require("express");

const {
  userData,
  loginUser,
  logOutUser,
} = require("../controller/user.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

// user routes
router.route("/register").post(userData).post(loginUser);
router.route("/register").get(logOutUser);

module.exports = router;
