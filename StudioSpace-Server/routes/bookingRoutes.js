const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const verifyToken = require('../middleware/verifyToken');

// Get user bookings
router.get('/', verifyToken, async (req, res) => {
  try {
    const email = req.query.email;
    
    // যদি ইমেইল কুয়েরি না থাকে অথবা টোকেন ইউজারের সাথে না মিলে
    if (!email || req.user.email !== email) {
      return res.status(403).json({ message: 'Forbidden access' });
    }

    const bookings = await Booking.find({ userEmail: email });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create booking with Double-Booking Prevention (Challenge 2)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { studioId, date, startTime, endTime } = req.body;

    // Check for existing confirmed bookings for that studio on the same date
    const existingBookings = await Booking.find({ 
      studioId, 
      date, 
      status: 'Confirmed' 
    });

    // Time collision check logic
    for (let booking of existingBookings) {
      // যদি নতুন বুকিংয়ের সময় আগের বুকিংয়ের সময়ের সাথে ওভারল্যাপ করে
      if (!(endTime <= booking.startTime || startTime >= booking.endTime)) {
        return res.status(400).json({ 
          message: 'Conflict Error: This studio is already booked and confirmed for the selected time slot!' 
        });
      }
    }

    // নতুন বুকিং তৈরি ও সেভ করা (টোকেন থেকে প্রাপ্ত ইমেইল নিশ্চিত করতে req.body ব্যবহার করা যেতে পারে)
    const newBooking = new Booking({
      ...req.body,
      userEmail: req.user.email // টোকেন থেকে ভেরিফাইড ইমেইল নিশ্চিত করা ভালো
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cancel / Update booking status
router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;