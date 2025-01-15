const Movie = require("../models/movie.model");

exports.addMovie = async (req, res) => {
  try {
    const { title, genre, description, release_year, director } = req.body;
    const file = req.file;

    if ((!title, !genre, !description, !release_year, !director)) {
      return res.status(404).json({
        message: "Invalid",
      });
    }
    const movie = await Movie.create({
      title,
      genre,
      description,
      release_year,
      director,
      image: file?.filename,
    });

    res.status(201).json({
      message: "Movie Created Successfully",
      movie,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating movie",
      error: error.message,
    });
  }
};

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().lean();
    res.status(200).json({
      message: "Fetched Movies Successfully",
      movies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching movies",
      error: error.message,
    });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const { title, genre, description, release_year, director } = req.body;
    const file = req.file;
  } catch (error) {
    res.status(500).json({
      message: error?.message,
    });
  }
};
