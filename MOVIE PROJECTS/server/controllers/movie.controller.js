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
    // const movie = await Movie.create({
    //   title,
    //   genre,
    //   description,
    //   release_year,
    //   director,
    //   image: file?.filename,
    // });

    console.log(file, "from frontend successfully created");
    console.log(req.user, "iam user");
    res.status(201).json({
      message: "Movie Created Successfully",
      // movie,
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
    const updateData = {
      title,
      genre,
      description,
      release_year,
      director,
      image,
    };
    if (file) {
      updateData.image = file;
    }
    if (req.id) {
      const movie = await Movie.findByIdAndUpdate(req.id, updateData, {
        new: true,
      });
      res.status(200).json({
        message: "Movie updated successfully",
        movie,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message,
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }
    res.status(200).json({
      message: "Movie deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
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
        message: "Movie not found",
      });
    }
    res.status(200).json({
      message: "Fetched Movie Successfully",
      movie,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching movie",
      error: error.message,
    });
  }
};
