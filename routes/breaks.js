const express = require('express');
const Break = require('../models/Break');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Start break
router.post('/start', auth, [
  body('breakType').isIn(['lunch', 'coffee', 'short', 'extended']).withMessage('Invalid break type'),
  body('reason').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { breakType, reason, location } = req.body;

    // Check if user already has an active break
    const activeBreak = await Break.findOne({
      userId: req.user.id,
      status: 'active'
    });

    if (activeBreak) {
      return res.status(400).json({ message: 'User already has an active break' });
    }

    const breakRecord = new Break({
      userId: req.user.id,
      startTime: new Date(),
      breakType,
      reason: reason || 'Regular break',
      location: location || 'Not specified'
    });

    await breakRecord.save();

    // Update user status
    await User.findByIdAndUpdate(req.user.id, { status: 'on-break' });

    // Emit socket event
    req.app.io.emit('break_started', {
      userId: req.user.id,
      breakType,
      startTime: breakRecord.startTime
    });

    res.status(201).json({
      message: 'Break started',
      break: breakRecord
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// End break
router.post('/end/:breakId', auth, async (req, res) => {
  try {
    const breakRecord = await Break.findById(req.params.breakId);

    if (!breakRecord) {
      return res.status(404).json({ message: 'Break not found' });
    }

    if (breakRecord.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    breakRecord.endTime = new Date();
    breakRecord.status = 'completed';
    await breakRecord.save();

    // Update user status and total break time
    const user = await User.findById(req.user.id);
    user.status = 'working';
    user.totalBreakTime += breakRecord.duration;
    await user.save();

    // Emit socket event
    req.app.io.emit('break_ended', {
      userId: req.user.id,
      duration: breakRecord.duration,
      endTime: breakRecord.endTime
    });

    res.json({
      message: 'Break ended',
      break: breakRecord
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's breaks
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const breaks = await Break.find({ userId: req.params.userId }).sort({ startTime: -1 });
    res.json(breaks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get today's breaks
router.get('/today', auth, async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const breaks = await Break.find({
      userId: req.user.id,
      startTime: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ startTime: -1 });

    res.json(breaks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get active break
router.get('/active', auth, async (req, res) => {
  try {
    const activeBreak = await Break.findOne({
      userId: req.user.id,
      status: 'active'
    });

    res.json(activeBreak || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
