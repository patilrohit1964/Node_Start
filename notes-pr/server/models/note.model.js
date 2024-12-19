const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    noteImage: {
      type: String,
      required: false,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWAg6_sW59_vOQBESbQzLjsoQZxeiEcRBKYQ&s",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
