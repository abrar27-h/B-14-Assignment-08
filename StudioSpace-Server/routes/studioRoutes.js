const express = require('express');
const router = express.Router();
const Studio = require('../models/Studio');
const verifyToken = require('../middleware/verifyToken');

// Get all studios or filter by category/search
router.get('/', async (req, res) => {
  try {
    const { category, search, limit } = req.query;
    let query = {};
    if (category && category !== 'All') query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };

    let studiosQuery = Studio.find(query);
    if (limit) studiosQuery = studiosQuery.limit(parseInt(limit));

    const studios = await studiosQuery.exec();
    res.json(studios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single studio details
router.get('/:id', async (req, res) => {
  try {
    const studio = await Studio.findById(req.params.id);
    if (!studio) return res.status(404).json({ message: 'Studio not found' });
    res.json(studio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new studio (Private Route + JWT Check)
router.post('/', verifyToken, async (req, res) => {
  try {
    const newStudio = new Studio(req.body);
    const savedStudio = await newStudio.save();
    res.status(201).json(savedStudio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update studio
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedStudio = await Studio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStudio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete studio
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletedStudio = await Studio.findByIdAndDelete(req.params.id);
    res.json({ message: 'Studio deleted successfully', deletedStudio });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;