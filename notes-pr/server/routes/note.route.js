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

router.route("/all-notes/:userId").get(verifyToken, getUserNotes);
router.route("/add-note").post(verifyToken, upload, addUserNotes);
router.route("/update-note/:noteId").put(verifyToken, upload, updateUserNotes);
router.route("/delete-note/:noteId").delete(verifyToken, deleteUserNotes);
router.route("/get-note/:noteId").get(verifyToken, getUserNotesById);

module.exports = router;
