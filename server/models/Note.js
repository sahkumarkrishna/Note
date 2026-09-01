const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  content: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Format output to return `id` instead of `_id` as requested by example
NoteSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

module.exports = mongoose.model('Note', NoteSchema);
