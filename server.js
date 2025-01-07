// Importing necessary libraries
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serving static files like HTML and CSS
app.use(express.static(path.join(__dirname, 'public')));

// Favorites array (initially empty)
let favorites = [];

// Route to display favorites
app.get('/favorites', (req, res) => {
  res.json(favorites); // Returning favorites to the user
});

// Route to add a place to favorites
app.post('/favorites', express.json(), (req, res) => {
  const { place } = req.body;
  if (place) {
    favorites.push(place); // Add the place to favorites
    res.status(201).json({ message: "Place added to favorites!" });
  } else {
    res.status(400).json({ message: "Place not provided!" });
  }
});

// Homepage route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
