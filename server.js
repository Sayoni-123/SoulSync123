const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Route for the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Ensure index.html is in the "public" folder
});

// Route for a 404 page
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});