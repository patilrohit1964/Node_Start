const Note = require("../models/note.model");
const User = require("../models/user.model");

// get user all notes
exports.getUserNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.id });

    if (!notes) {
      return res.status(404).json({
        success: false,
        message: "Notes not found",
      });
    }

    res.status(200).json({
      success: true,
      notes,
      message: "Notes fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching notes",
      error: error.message,
    });
  }
};

// update user notes
exports.updateUserNotes = async (req, res) => {
  try {
    const { title, description, noteImage } = req.body;
    const updateData = {
      title,
      description,
      noteImage: req?.file?.originalname,
    };

    const note = await Note.findById(req.params.noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.noteId,
      updateData,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      note: updatedNote,
      message: "Note updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating note",
      error: error.message,
    });
  }
};

// delete user notes
exports.deleteUserNotes = async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    await Note.findByIdAndDelete(req.params.noteId);

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting note",
      error: error.message,
    });
  }
};

// user notes with id
exports.getUserNotesById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching note",
      error: error.message,
    });
  }
};

// add new user note in their db
exports.addUserNotes = async (req, res) => {
  try {
    const { title, description, noteImage, userId } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const note = await Note.create({
      title,
      description,
      noteImage: req?.file?.originalname,
      userId: req?.id,
    });
   
    console.log(req.file);
    res.status(201).json({
      success: true,
      note,
      message: "Note added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding note",
      error: error.message,
    });
  }
};
