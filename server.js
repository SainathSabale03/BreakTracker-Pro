const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/breaktracker')
  .then(() => console.log('✓ MongoDB connected'))
  .catch(err => console.error('✗ MongoDB connection error:', err));

// Import Routes
const authRoutes = require('./routes/auth');
const breakRoutes = require('./routes/breaks');
const userRoutes = require('./routes/users');
const analyticsRoutes = require('./routes/analytics');
const adminRoutes = require('./routes/admin');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/breaks', breakRoutes);
app.use('/api/users', userRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Socket.IO Events
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  socket.on('user_status_change', (data) => {
    io.emit('status_updated', data);
  });

  socket.on('break_started', (data) => {
    io.emit('break_notification', { type: 'started', ...data });
  });

  socket.on('break_ended', (data) => {
    io.emit('break_notification', { type: 'ended', ...data });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Store io in app for route access
app.io = io;

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📊 BreakTracker-Pro API started`);
  console.log(`🔗 Environment: ${process.env.NODE_ENV}\n`);
});

module.exports = app;
