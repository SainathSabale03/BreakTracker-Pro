const express = require('express');
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('manager', 'name email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/profile/:userId', auth, async (req, res) => {
  try {
    if (req.params.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { name, department, breakLimit } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { name, department, breakLimit, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get team members (for managers)
router.get('/team', auth, authorize(['manager', 'admin']), async (req, res) => {
  try {
    const filter = req.user.role === 'manager' ? { manager: req.user.id } : {};
    const users = await User.find(filter).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user status
router.get('/status/:userId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('status');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user status
router.put('/status/:userId', auth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['working', 'on-break', 'offline'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { status },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
