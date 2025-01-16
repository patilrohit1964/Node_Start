const express = require("express");
const upload = require("../utils/multer");
const {
  addMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie.controller");

const router = express.Router();
router.route("/get-movies").get(getMovies);
router.route("/get-movie/:id").get(getMovieById);
router.route("/add-movie").post(upload.single("file"), addMovie);
router.route("/update-movie/:id").put(upload.single("file"), updateMovie);
router.route("/delete-movie/:id").delete(deleteMovie);
module.exports = router;
