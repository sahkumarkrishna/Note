import React from 'react';

const NoteItem = ({ note, onDelete, isDeleting }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-all group flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xl font-medium text-white mb-2 break-words">{note.title}</h3>
        {note.content && (
          <p className="text-white/70 text-sm whitespace-pre-wrap break-words">{note.content}</p>
        )}
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => onDelete(note.id)}
          disabled={isDeleting}
          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 px-3 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
