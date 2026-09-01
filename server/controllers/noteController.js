const Note = require('../models/Note');

// @desc    Create a note
// @route   POST /notes
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required' });
    }

    const note = await Note.create({ title, content });
    
    res.status(201).json({
      id: note.id,
      title: note.title,
      content: note.content
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create note' });
  }
};

// @desc    Get all notes
// @route   GET /notes
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    
    const formattedNotes = notes.map(note => ({
      id: note.id,
      title: note.title,
      content: note.content
    }));

    res.status(200).json(formattedNotes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
};

// @desc    Delete a note
// @route   DELETE /notes/:id
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    await note.deleteOne();
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(500).json({ message: 'Failed to delete note' });
  }
};

module.exports = {
  createNote,
  getNotes,
  deleteNote
};
