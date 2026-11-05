const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 1. REGISTER ROUTE (New account create korar jonno)
router.post('/register', async (req, res) => {
  try {
    const { email, name, password, photoURL } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered! Please login.' });
    }

    const newUser = new User({ 
      name: name || 'User', 
      email, 
      photoURL: photoURL || '' 
    });
    await newUser.save();

    const token = jwt.sign(
      { email, name: newUser.name }, 
      process.env.JWT_SECRET || 'my_super_secret_key_studio_space_2026', 
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
    }).json({ 
      success: true, 
      message: 'Registered successfully',
      user: { name: newUser.name, email: newUser.email, photoURL: newUser.photoURL }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. LOGIN ROUTE (Age theke register kora thaklei shudhu access dibe)
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Account not found! Please register first.' });
    }

    const token = jwt.sign(
      { email, name: user.name }, 
      process.env.JWT_SECRET || 'my_super_secret_key_studio_space_2026', 
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
    }).json({ 
      success: true, 
      message: 'Logged in successfully',
      user: { name: user.name, email: user.email, photoURL: user.photoURL }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
  }).json({ success: true, message: 'Logged out successfully' });
});

module.exports = router;