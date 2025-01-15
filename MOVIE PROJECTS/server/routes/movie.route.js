const express = require("express");
const upload = require("../utils/multer");
const { addMovie } = require("../controllers/movie.controller");

const router = express.Router();
router.route("/get-movies").get();
router.route("/add-movie").post(upload.single("file"), addMovie);
router.route("/update-movie/:id").put();
router.route("/delete-movie/:id").delete();
module.exports = router;
