const express = require("express");

const router = express.Router();
const isAdmin = require("../utils/isAdmin");
const { getAdminUsers } = require("../controller/admin.controller");

router.route("/all-users").get(isAdmin, getAdminUsers);
router.route("/delete-user/:userId").delete(isAdmin, deleteAdminUser);
router.route("/update-user/:userId").put(isAdmin, updateAdminUser);
module.exports = router;
