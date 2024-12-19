const express = require("express");
const { userData, getUserNotes } = require("../controller/user.controller");
const verifyToken = require("../utils/verifyToken");
const router = express.Router();

// user routes
router.post("/user-data", userData);
router.get("/all-notes", verifyToken, getUserNotes);
router.delete("/note-delete/:id", verifyToken);
router.put("/note-update/:id", verifyToken);

module.exports = router;
