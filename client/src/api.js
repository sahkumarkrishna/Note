const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/notes';

export const getNotes = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }
  return response.json();
};

export const createNote = async (noteData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(noteData),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create note');
  }
  return response.json();
};

export const deleteNote = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete note');
  }
  return response.json();
};
