const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/egyptTourism', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Define a Schema for cities and their details
const citySchema = new mongoose.Schema({
  name: String,
  restaurants: [
    {
      name: String,
      rating: Number,
    }
  ],
  hotels: [
    {
      name: String,
      rating: Number,
    }
  ],
});

// Create a model
const City = mongoose.model('City', citySchema);

// API routes

// Route to get all cities
app.get('/cities', async (req, res) => {
  const cities = await City.find();
  res.json(cities);
});

// Route to add a new city
app.post('/cities', async (req, res) => {
  const newCity = new City(req.body);
  await newCity.save();
  res.json({ message: 'City added successfully!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
