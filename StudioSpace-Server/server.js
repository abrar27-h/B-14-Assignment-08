const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// মডেলগুলো ইম্পোর্ট করা হলো
const User = require('./models/User');
const Booking = require('./models/Booking');
const Studio = require('./models/Studio');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
  ],
  credentials: true
}));

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/studios', require('./routes/studioRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

// Root Route
app.get('/', (req, res) => {
  res.send('StudioSpace Backend Server is running...');
});

// Users Fetch Route
app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).send({ message: "Failed to fetch users", error: error.message });
  }
});

// Bookings Fetch Route
app.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.send(bookings);
  } catch (error) {
    console.error("Fetch bookings error:", error);
    res.status(500).send({ message: "Failed to fetch bookings", error: error.message });
  }
});

// Studios Fetch Route
app.get('/studios', async (req, res) => {
  try {
    const studios = await Studio.find({});
    res.send(studios);
  } catch (error) {
    console.error("Fetch studios error:", error);
    res.status(500).send({ message: "Failed to fetch studios", error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






const path = require('path');


// ফ্রন্টএন্ডের বিল্ড ফোল্ডার কানেক্ট করা
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});