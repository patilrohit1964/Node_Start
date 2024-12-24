const express = require("express");

const router = express.Router();
const isAdmin = require("../utils/isAdmin");
const {
  getAdminUsers,
  deleteAdminUser,
  updateAdminUser,
} = require("../controller/admin.controller");
const verifyToken = require("../middleware/verifyToken");

router.route("/all-users").get(verifyToken, isAdmin, getAdminUsers);
router
  .route("/delete-user/:userId")
  .delete(verifyToken, isAdmin, deleteAdminUser);
router.route("/update-user/:userId").put(verifyToken, isAdmin, updateAdminUser);
module.exports = router;
