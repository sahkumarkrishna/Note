import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const NoteForm = ({ onAddNote, isSubmitting }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      toast.error('Title cannot be empty');
      return;
    }
    
    try {
      await onAddNote({ title: title.trim(), content: content.trim() });
      setTitle('');
      setContent('');
    } catch (err) {
      toast.error(err.message || 'Failed to add note');
    }
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-[1.25rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 pointer-events-none"></div>
      <div className="relative bg-[#18181b]/80 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-[1.25rem] shadow-2xl w-full mb-12">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="bg-purple-500/20 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
              <path d="M12 5v14"></path>
              <path d="M5 12h14"></path>
            </svg>
          </div>
          Create Note
        </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            disabled={isSubmitting}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white font-medium placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all shadow-inner"
          />
        </div>
        <div>
          <textarea
            placeholder="Note Content (optional)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all resize-none shadow-inner"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:-translate-y-1 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <span className="animate-pulse">Saving...</span>
          ) : (
            <>
              Save Note
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </>
          )}
        </button>
      </form>
      </div>
    </div>
  );
};

export default NoteForm;
