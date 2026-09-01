const express = require('express');
const router = express.Router();
const { createNote, getNotes, deleteNote } = require('../controllers/noteController');

router.route('/').post(createNote).get(getNotes);
router.route('/:id').delete(deleteNote);

module.exports = router;
