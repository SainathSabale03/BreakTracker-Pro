const express = require('express');
const Break = require('../models/Break');
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Get user analytics
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = { userId: req.params.userId };

    if (startDate || endDate) {
      query.startTime = {};
      if (startDate) query.startTime.$gte = new Date(startDate);
      if (endDate) query.startTime.$lte = new Date(endDate);
    }

    const breaks = await Break.find(query);

    const analytics = {
      totalBreaks: breaks.length,
      totalBreakTime: breaks.reduce((sum, b) => sum + (b.duration || 0), 0),
      averageBreakDuration: breaks.length > 0 ? Math.round(breaks.reduce((sum, b) => sum + (b.duration || 0), 0) / breaks.length) : 0,
      breaksByType: {},
      dailyBreaks: {}
    };

    breaks.forEach(breakRecord => {
      // Count by type
      analytics.breaksByType[breakRecord.breakType] = (analytics.breaksByType[breakRecord.breakType] || 0) + 1;

      // Count by day
      const day = new Date(breakRecord.startTime).toISOString().split('T')[0];
      if (!analytics.dailyBreaks[day]) {
        analytics.dailyBreaks[day] = { count: 0, duration: 0 };
      }
      analytics.dailyBreaks[day].count++;
      analytics.dailyBreaks[day].duration += breakRecord.duration || 0;
    });

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get team analytics (for managers)
router.get('/team', auth, authorize(['manager', 'admin']), async (req, res) => {
  try {
    const filter = req.user.role === 'manager' ? { manager: req.user.id } : {};
    const teamMembers = await User.find(filter).select('_id name');
    const userIds = teamMembers.map(u => u._id);

    const breaks = await Break.find({ userId: { $in: userIds } });

    const analytics = {
      teamSize: teamMembers.length,
      totalBreaks: breaks.length,
      averageBreakPerPerson: teamMembers.length > 0 ? Math.round(breaks.length / teamMembers.length) : 0,
      members: teamMembers.map(member => {
        const memberBreaks = breaks.filter(b => b.userId.toString() === member._id.toString());
        return {
          name: member.name,
          breakCount: memberBreaks.length,
          totalBreakTime: memberBreaks.reduce((sum, b) => sum + (b.duration || 0), 0)
        };
      })
    };

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
