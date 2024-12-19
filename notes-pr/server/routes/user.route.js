const express = require("express");
const { userData, getUserNotes } = require("../controller/user.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

// user routes
router.post("/user-data", userData);


module.exports = router;
