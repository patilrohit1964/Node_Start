const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
    },
    director: {
      type: String,
      required: [true, "Director is required"],
    },
    release_year: {
      type: Number,
      required: [true, "Release year is required"],
      min: [1900, "Release year must be after 1900"],
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
