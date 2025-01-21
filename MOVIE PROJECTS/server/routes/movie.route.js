const express = require("express");
const upload = require("../utils/multer");
const {
  addMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie.controller");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();
router.route("/get-movies").get(verifyToken, getMovies);
router.route("/get-movie/:id").get(verifyToken, getMovieById);
router.route("/add-movie").post(verifyToken, upload.single("file"), addMovie);
router
  .route("/update-movie/:id")
  .put(verifyToken, upload.single("file"), updateMovie);
router.route("/delete-movie/:id").delete(verifyToken, deleteMovie);
module.exports = router;
