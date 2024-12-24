const express = require("express");

const router = express.Router();
const isAdmin = require("../utils/isAdmin");
const {
  getAdminUsers,
  deleteAdminUser,
  updateAdminUser,
  addAdminUser,
} = require("../controller/admin.controller");
const verifyToken = require("../middleware/verifyToken");
const { getAllNotes } = require("../controller/note.controller");

router.route("/all-users").get(verifyToken, isAdmin, getAdminUsers);
router
  .route("/delete-user/:userId")
  .delete(verifyToken, isAdmin, deleteAdminUser);
router.route("/update-user/:userId").put(verifyToken, isAdmin, updateAdminUser);
router.route("/add-user").post(verifyToken, isAdmin, addAdminUser);
router.route("/all-notes").get(verifyToken, isAdmin, getAllNotes);
module.exports = router;
