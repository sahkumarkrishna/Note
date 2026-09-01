require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const MONGO_URI = process.env.MONGO_URI;

// Vercel Serverless Function Database Connection
// This connects to the database when the serverless function is invoked.
if (MONGO_URI) {
  mongoose.connect(MONGO_URI).then(() => {
      console.log('MongoDB connected successfully on Vercel');
  }).catch(err => {
      console.error('Failed to connect to MongoDB', err);
  });
}

// Export the Express API so Vercel can consume it
module.exports = app;
