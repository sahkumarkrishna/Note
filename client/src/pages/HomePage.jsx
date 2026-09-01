import React, { useState, useEffect, Suspense, lazy } from 'react';
import { getNotes, createNote, deleteNote, updateNote } from '../api';
import { toast } from 'react-hot-toast';

const NoteForm = lazy(() => import('../components/NoteForm'));
const NoteList = lazy(() => import('../components/NoteList'));

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

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
      toast.success('Note added successfully!');
    } catch (err) {
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      setDeletingId(id);
      await deleteNote(id);
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
      toast.success('Note deleted!');
    } catch (err) {
      toast.error('Failed to delete note.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdateNote = async (id, noteData) => {
    try {
      setUpdatingId(id);
      const updatedNote = await updateNote(id, noteData);
      setNotes(prevNotes => prevNotes.map(note => note.id === id ? updatedNote : note));
      toast.success('Note updated!');
    } catch (err) {
      toast.error(err.message || 'Failed to update note.');
      throw err;
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      <header className="mb-12 mt-4 text-center">
        <div className="inline-block relative">
          <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full"></div>
          <h1 className="relative text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 tracking-tight drop-shadow-sm mb-4">
            Notes
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-slate-400 max-w-lg mx-auto">Capture your ideas instantly with a beautiful, blazing fast experience.</p>
      </header>

      <main>
        <Suspense fallback={
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
          </div>
        }>
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
              onUpdate={handleUpdateNote}
              deletingId={deletingId}
              updatingId={updatingId}
            />
          </div>
        </Suspense>
      </main>
    </div>
  );
};

export default HomePage;
