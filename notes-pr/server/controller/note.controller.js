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
exports.updateUserNotes = async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    success: true,
    note,
  });
};
// delete user notes

exports.deleteUserNotes = async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    note,
  });
};
// user notes with id
exports.getUserNotesById = async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.status(200).json({
    success: true,
    note,
  });
};

// add new user note in their db
exports.addUserNotes = async (req, res) => {
  const note = await Note.create(req.body);
  res.status(200).json({
    success: true,
    note,
  });
};
