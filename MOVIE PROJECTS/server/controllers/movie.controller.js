const Movie = require("../models/movie.model");

exports.addMovie = async (req, res) => {
  try {
    const { title, genre, description, release_year, director } = req.body;
    const file = req.file;

    if ((!title, !genre, !description, !release_year, !director)) {
      return res.status(404).json({
        success: false,
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
      userId: req.user,
    });
    res.status(201).json({
      success: true,
      message: "Movie Created Successfully",
      movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating movie",
      error: error.message,
    });
  }
};

exports.getMoviesByUserId = async (req, res) => {
  try {
    const movies = await Movie.find({ userId: req.user }).lean();
    res.status(200).json({
      success: true,
      message: "Fetched Movies Successfully",
      movies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching movies",
      error: error.message,
    });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const { title, genre, description, release_year, director } = req.body;
    const file = req.file;
    const updateData = {
      title,
      genre, 
      description,
      release_year,
      director
    };
    if (file) {
      updateData.image = file.filename; // Fix 1: Use file.filename instead of file
    }

    const movie = await Movie.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!movie) { // Fix 2: Handle case where movie is not found
      return res.status(404).json({
        success: false,
        message: "Movie not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting movie",
      error: error.message,
    });
  }
};
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).lean();
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Fetched Movie Successfully",
      movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching movie",
      error: error.message,
    });
  }
};

// fetched movies with user id
