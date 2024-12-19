const express = require("express");
const {
  getUserNotes,
  updateUserNotes,
  deleteUserNotes,
  getUserNotesById,
  addUserNotes,
} = require("../controller/note.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.get("/all-notes", verifyToken, getUserNotes);
router.post("/add-note", verifyToken, addUserNotes);
router.put("/update-note/:id", verifyToken, updateUserNotes);
router.delete("/delete-note/:id", verifyToken, deleteUserNotes);
router.get("/note/:id", verifyToken, getUserNotesById);

module.exports = router;
