import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const NoteItem = ({ note, onDelete, onUpdate, isDeleting, isUpdating }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content || '');

  const handleSave = async () => {
    if (!editTitle.trim()) {
      toast.error('Title cannot be empty');
      return;
    }
    
    try {
      await onUpdate(note.id, { title: editTitle, content: editContent });
      setIsEditing(false);
    } catch (err) {
      // Error handled by parent toast
    }
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-purple-500/50 p-5 rounded-2xl shadow-lg flex flex-col justify-between h-full transition-all">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            disabled={isUpdating}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Note Title"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            disabled={isUpdating}
            rows={3}
            className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            placeholder="Note Content"
          />
        </div>
        
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={handleCancel}
            disabled={isUpdating}
            className="text-white/60 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isUpdating}
            className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all shadow-md disabled:opacity-50 flex items-center gap-2"
          >
            {isUpdating ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#18181b]/60 backdrop-blur-md border border-white/10 p-6 rounded-[1.25rem] hover:bg-[#18181b]/90 hover:border-purple-500/30 transition-all duration-300 group flex flex-col justify-between h-full hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(147,51,234,0.15)]">
      <div>
        <h3 className="text-xl font-bold text-slate-100 mb-3 break-words group-hover:text-purple-300 transition-colors duration-300">{note.title}</h3>
        {note.content && (
          <p className="text-white/70 text-sm whitespace-pre-wrap break-words line-clamp-3">{note.content}</p>
        )}
      </div>
      
      <div className="mt-6 flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
        <Link
          to={`/notes/${note.id}`}
          className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10 px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          View
        </Link>
        <button
          onClick={() => setIsEditing(true)}
          disabled={isDeleting}
          className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 px-3 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-50 flex items-center gap-1.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 Z"></path>
          </svg>
          Edit
        </button>
        <button
          onClick={() => onDelete(note.id)}
          disabled={isDeleting}
          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 px-3 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-50 flex items-center gap-1.5"
        >
          {isDeleting ? (
            <span className="animate-pulse">Deleting...</span>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
              Delete
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
