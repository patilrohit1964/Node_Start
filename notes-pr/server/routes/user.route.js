const express = require("express");

const {
  userData,
  loginUser,
  logOutUser,
  updateProfile,
} = require("../controller/user.controller");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../utils/uploadFile");
const createOtp = require("../utils/otpGenerator");
const router = express.Router();

// user routes
router.route("/register").post(userData);
router.route("/login").post(loginUser);
router.route("/logout").get(logOutUser);
router.route("/update-profile").put(verifyToken, upload, updateProfile);

module.exports = router;
