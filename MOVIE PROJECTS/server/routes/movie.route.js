const express = require("express");

const router = express.Router();
router.route("/get-movies").get();
router.route("/add-movie").post();
router.route("/update-movie/:id").put();
router.route("/delete-movie/:id").delete();
module.exports = router;
