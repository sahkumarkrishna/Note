import React, { useState } from 'react';

const NoteForm = ({ onAddNote, isSubmitting }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      setError('Title cannot be empty');
      return;
    }
    
    setError('');
    
    try {
      await onAddNote({ title: title.trim(), content: content.trim() });
      setTitle('');
      setContent('');
    } catch (err) {
      setError(err.message || 'Failed to add note');
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl w-full mb-8 transition-all hover:shadow-2xl">
      <h2 className="text-2xl font-semibold text-white mb-4">Add a New Note</h2>
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            disabled={isSubmitting}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>
        <div>
          <textarea
            placeholder="Note Content (optional)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {isSubmitting ? 'Adding Note...' : 'Add Note'}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
