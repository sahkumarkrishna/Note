const express = require('express');
const router = express.Router();
const { createNote, getNotes, getNoteById, deleteNote, updateNote } = require('../controllers/noteController');

router.route('/').post(createNote).get(getNotes);
router.route('/:id').get(getNoteById).delete(deleteNote).put(updateNote);

module.exports = router;
