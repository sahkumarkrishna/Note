# MERN Notes Application

A clean, responsive, and minimal full-stack Notes application built with the MERN stack.

## Tech Stack

*   **Frontend:** React (Vite), Tailwind CSS
*   **Backend:** Node.js, Express
*   **Database:** MongoDB

## Features

*   Create new notes with a title and optional content.
*   View all notes in a responsive grid layout.
*   Delete notes.
*   Form validation (prevents empty titles).
*   Loading and error states handled gracefully.
*   Beautiful, modern UI with Tailwind CSS.

## API Endpoints

*   `POST /notes` - Create a new note.
    *   Body: `{ "title": "My Note", "content": "Optional content" }`
*   `GET /notes` - Get all notes.
*   `DELETE /notes/:id` - Delete a note by its ID.

## Local Setup

Follow these instructions to run the project locally.



### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory (or use the provided one):
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/notes_db
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal window:
```bash
cd client
npm install
npm run dev
```

## Approach

*   **Database**: Notes are stored in MongoDB using Mongoose with a simple schema.
*   **API**: Express handles RESTful routing. Validation is done at the controller level before interacting with the database.
*   **Frontend**: React (via Vite) is used for a fast development experience. Tailwind CSS provides all styling.
*   **State Management**: Standard React hooks (`useState`, `useEffect`) manage the application state (notes list, loading status, errors) to keep the architecture simple without Redux.
*   **Error Handling**: Both client and server gracefully catch and display errors (e.g., API failures, validation errors) to the user.
