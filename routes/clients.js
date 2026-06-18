const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
};

// Get client profile
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const client = await Client.findById(req.user.id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update phone number
router.put('/profile', isAuthenticated, async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    
    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }
    
    const client = await Client.findByIdAndUpdate(
      req.user.id,
      { phoneNumber, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
    res.json({
      message: 'Profile updated successfully',
      client
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all clients (admin endpoint)
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const clients = await Client.find().select('-__v');
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
