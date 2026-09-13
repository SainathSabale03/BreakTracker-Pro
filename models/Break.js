const mongoose = require('mongoose');

const breakSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    default: null
  },
  duration: {
    type: Number,
    default: 0 // in seconds
  },
  breakType: {
    type: String,
    enum: ['lunch', 'coffee', 'short', 'extended'],
    default: 'short'
  },
  reason: {
    type: String,
    default: 'Regular break'
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  location: {
    type: String,
    default: 'Not specified'
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate duration before saving
breakSchema.pre('save', function(next) {
  if (this.endTime && this.startTime) {
    this.duration = Math.round((this.endTime - this.startTime) / 1000);
  }
  next();
});

module.exports = mongoose.model('Break', breakSchema);
