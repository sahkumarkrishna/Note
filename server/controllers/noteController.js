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

// @desc    Get a single note by ID
// @route   GET /notes/:id
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(500).json({ message: 'Failed to fetch note' });
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

// @desc    Update a note
// @route   PUT /notes/:id
const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ message: 'Title is required' });
    }

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.title = title.trim();
    note.content = content ? content.trim() : '';

    const updatedNote = await note.save();

    res.status(200).json({
      id: updatedNote.id,
      title: updatedNote.title,
      content: updatedNote.content
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(500).json({ message: 'Failed to update note' });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  deleteNote,
  updateNote
};
