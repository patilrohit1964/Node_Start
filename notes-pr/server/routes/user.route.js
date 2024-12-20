const express = require("express");
const {
  userData,
  loginUser,
} = require("../controller/user.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

// user routes
router.post("/user-data", userData);
router.post("/login", loginUser);

module.exports = router;
