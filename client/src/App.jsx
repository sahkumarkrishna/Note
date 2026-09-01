import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { getNotes, createNote, deleteNote } from './api';

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Loading states for actions
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      setError('Failed to load notes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = async (noteData) => {
    try {
      setIsSubmitting(true);
      const newNote = await createNote(noteData);
      setNotes(prevNotes => [newNote, ...prevNotes]);
    } catch (err) {
      throw err; // Re-throw to be handled by the form component
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      setDeletingId(id);
      await deleteNote(id);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    } catch (err) {
      alert('Failed to delete note. It might have already been deleted.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-purple-500/30">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 tracking-tight">
            Notes
          </h1>
          <p className="mt-3 text-lg text-purple-200/70">Capture your ideas instantly.</p>
        </header>

        <main>
          <NoteForm onAddNote={handleAddNote} isSubmitting={isSubmitting} />
          
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Your Notes</h2>
              <span className="bg-white/10 text-white/80 py-1 px-3 rounded-full text-sm font-medium">
                {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
              </span>
            </div>
            
            <NoteList 
              notes={notes} 
              isLoading={isLoading} 
              error={error} 
              onDelete={handleDeleteNote}
              deletingId={deletingId}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
