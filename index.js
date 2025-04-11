/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const path = require('path'); // Import the 'path' module

const app = express();

app.use(express.json());

// Serve static files from the 'frontend/dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all other requests by serving index.html from the correct location
app.get('/Analytics', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Handle all other requests by serving index.html from the correct location
app.get('/Quiz', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
