const express = require("express");
const { userData, getUserNotes } = require("../controller/user.controller");
const verifyToken = require("../utils/verifyToken");
const router = express.Router();

// user routes
router.get("/", verifyToken, getUserNotes);
router.post("/user-data", userData);
router.delete("");
router.put("");
module.exports = router;
