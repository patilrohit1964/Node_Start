const express = require("express");
const {
  getUserNotes,
  updateUserNotes,
  deleteUserNotes,
  getUserNotesById,
  addUserNotes,
} = require("../controller/note.controller");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../utils/uploadFile");
const router = express.Router();

router.get("/all-notes/:userId", verifyToken, getUserNotes);
router.post("/add-note", verifyToken, upload.single("file"), addUserNotes);
router.put(
  "/update-note/:noteId",
  verifyToken,
  upload.single("file"),
  updateUserNotes
);
router.delete("/delete-note/:noteId", verifyToken, deleteUserNotes);
router.get("/get-note/:noteId", verifyToken, getUserNotesById);

module.exports = router;
