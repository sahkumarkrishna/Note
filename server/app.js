const express = require('express');
const cors = require('cors');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://note-6ykc.vercel.app',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/notes', noteRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Notes API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
