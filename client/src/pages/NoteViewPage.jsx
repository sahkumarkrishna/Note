import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getNote, deleteNote } from '../api';
import { toast } from 'react-hot-toast';

const NoteViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setIsLoading(true);
        const data = await getNote(id);
        setNote(data);
      } catch (err) {
        setError(err.message || 'Failed to load note');
      } finally {
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    
    try {
      setIsDeleting(true);
      await deleteNote(id);
      toast.success('Note deleted!');
      navigate('/');
    } catch (err) {
      toast.error('Failed to delete note');
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="max-w-2xl mx-auto text-center mt-20">
        <div className="bg-red-500/20 border border-red-500/50 text-red-100 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-2">Oops!</h2>
          <p className="text-lg">{error || 'Note not found'}</p>
          <div className="mt-6">
            <Link to="/" className="text-purple-300 hover:text-purple-200 underline underline-offset-4">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-white/70 hover:text-white flex items-center gap-2 transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Back to Notes
        </Link>
        
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-red-400 hover:text-red-300 hover:bg-red-400/10 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
          {isDeleting ? 'Deleting...' : 'Delete Note'}
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-8 break-words leading-tight">
            {note.title}
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none">
            {note.content ? (
              <p className="text-white/80 whitespace-pre-wrap leading-relaxed text-lg font-light">
                {note.content}
              </p>
            ) : (
              <p className="text-white/30 italic">No content provided.</p>
            )}
          </div>
          
          <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 text-xs text-white/40">
            <div>
              <span className="font-semibold text-white/50">Created: </span>
              {new Date(note.createdAt).toLocaleString()}
            </div>
            {note.updatedAt && note.updatedAt !== note.createdAt && (
              <div>
                <span className="font-semibold text-white/50">Last Edited: </span>
                {new Date(note.updatedAt).toLocaleString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteViewPage;
