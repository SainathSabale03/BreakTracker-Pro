const express = require('express');
const User = require('../models/User');
const Break = require('../models/Break');
const Company = require('../models/Company');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all users (admin only)
router.get('/users', auth, authorize(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Assign manager to employee
router.put('/assign-manager/:userId', auth, authorize(['admin']), async (req, res) => {
  try {
    const { managerId } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { manager: managerId },
      { new: true }
    ).populate('manager', 'name email');

    res.json({
      message: 'Manager assigned',
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get system statistics
router.get('/statistics', auth, authorize(['admin']), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBreaks = await Break.countDocuments();
    const usersByRole = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } }
    ]);

    const stats = {
      totalUsers,
      totalBreaks,
      usersByRole: usersByRole.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      timestamp: new Date()
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
