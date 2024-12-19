const Note = require("../models/note.model");
const User = require("../models/user.model");

// get user all notes
exports.getUserNotes = async (req, res) => {
  const user = await Note.findById(req.id);
  res.status(200).json({
    success: true,
    user,
  });
};

// update user notes

// delete user notes

// user notes with id

// add new user note in their db
