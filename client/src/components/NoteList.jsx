import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, isLoading, error, onDelete, deletingId }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
        <span className="ml-3 text-white text-lg">Loading notes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500/50 text-red-100 p-6 rounded-xl text-center">
        <p className="text-lg">{error}</p>
        <p className="text-sm mt-2 opacity-75">Please try refreshing the page.</p>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10 border-dashed">
        <p className="text-white/60 text-lg">No notes found.</p>
        <p className="text-white/40 text-sm mt-2">Create one above to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <NoteItem 
          key={note.id} 
          note={note} 
          onDelete={onDelete} 
          isDeleting={deletingId === note.id}
        />
      ))}
    </div>
  );
};

export default NoteList;
