# BreakTracker-Pro 🕐

**Break Tracking and Monitoring Web Application** - A comprehensive, professional, and feature-rich platform for employees and managers to track, monitor, and optimize break times in organizations.

## 🎯 Features

### For Employees
- ✅ **Real-time Break Tracking** - Start and stop breaks with one click
- ⏱️ **Multiple Break Types** - Lunch, Coffee, Short Break, Extended Break
- 📊 **Personal Analytics** - Daily, weekly, and monthly break statistics
- 📈 **Break Patterns** - Visual insights into break habits
- 🔔 **Notifications** - Real-time notifications for break status
- 💾 **Break History** - Complete history of all breaks taken

### For Managers
- 👥 **Team Overview** - Real-time status of all team members
- 📊 **Team Analytics** - Aggregate break statistics and trends
- 🎯 **Performance Monitoring** - Track team productivity vs breaks
- 📈 **Custom Reports** - Generate reports by date range, department
- ⚠️ **Alerts & Warnings** - Notifications for excessive/insufficient breaks
- 🏆 **Team Leaderboard** - Best practices in break management

### For Administrators
- ⚙️ **System Configuration** - Set break policies and limits
- 👤 **User Management** - Add/remove employees, assign managers
- 🔐 **Role Management** - Employee, Manager, Admin roles
- 📊 **System Analytics** - System-wide monitoring and statistics
- 🔒 **Audit Logs** - Track all system activities
- 🏢 **Company Settings** - Configure company break policies

## 🚀 Tech Stack (100% FREE & Open Source)

### Frontend
- **React 18** - Modern UI library
- **Tailwind CSS** - Beautiful, responsive styling
- **Framer Motion** - Smooth animations
- **Recharts** - Professional data visualization
- **React Query** - Data fetching and caching
- **Zustand** - State management
- **Socket.io Client** - Real-time updates

### Backend
- **Node.js + Express.js** - Fast, scalable server
- **MongoDB** - NoSQL document database
- **Mongoose** - ODM for MongoDB
- **Socket.io** - Real-time bidirectional communication
- **JWT** - Secure authentication
- **Bcryptjs** - Password hashing

### Hosting (All FREE)
- **Vercel** - Frontend hosting (free tier)
- **Render/Railway** - Backend hosting (free tier)
- **MongoDB Atlas** - Database hosting (free tier: 512MB)

## 📦 Installation & Setup

### Prerequisites
- Node.js 14.x or higher
- npm or yarn
- MongoDB Atlas account (free)

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/SainathSabale03/BreakTracker-Pro.git
cd BreakTracker-Pro

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure .env with your MongoDB URI and JWT secret
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/breaktracker
# JWT_SECRET=your_secret_key_here
# PORT=5000

# Start the server
npm run server
# Server will run on http://localhost:5000
```

### Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure .env
# REACT_APP_API_BASE_URL=http://localhost:5000/api
# REACT_APP_SOCKET_URL=http://localhost:5000

# Start the development server
npm start
# App will run on http://localhost:3000
```

### Run Both Together

```bash
# From root directory
npm run dev
```

## 🗄️ Database Setup

### MongoDB Atlas (Free Tier)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/breaktracker`
4. Add your IP address to IP whitelist
5. Add connection string to `.env` file

## 📁 Project Structure

```
BreakTracker-Pro/
├── server.js                 # Main server file
├── package.json             # Backend dependencies
├── .env.example            # Environment variables template
│
├── config/
│   └── database.js         # MongoDB connection
│
├── middleware/
│   └── auth.js             # JWT authentication
│
├── models/
│   ├── User.js             # User schema
│   ├── Break.js            # Break tracking schema
│   └── Company.js          # Company configuration schema
│
├── routes/
│   ├── auth.js             # Authentication endpoints
│   ├── breaks.js           # Break tracking endpoints
│   ├── users.js            # User profile endpoints
│   ├── analytics.js        # Analytics endpoints
│   └── admin.js            # Admin endpoints
│
└── client/                  # React frontend
    ├── package.json
    ├── public/
    ├── src/
    │   ├── index.js
    │   ├── App.js
    │   ├── index.css
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── Sidebar.js
    │   │   ├── BreakTimer.js
    │   │   └── PrivateRoute.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── EmployeeDashboard.js
    │   │   ├── ManagerDashboard.js
    │   │   ├── AdminDashboard.js
    │   │   ├── Analytics.js
    │   │   ├── Profile.js
    │   │   └── TeamManagement.js
    │   └── store/
    │       ├── authStore.js
    │       └── breakStore.js
    ├── tailwind.config.js
    └── .env.example
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Breaks
- `POST /api/breaks/start` - Start a break (protected)
- `POST /api/breaks/end/:breakId` - End a break (protected)
- `GET /api/breaks/active` - Get active break (protected)
- `GET /api/breaks/today` - Get today's breaks (protected)
- `GET /api/breaks/user/:userId` - Get user's breaks (protected)

### Users
- `GET /api/users/profile/:userId` - Get user profile (protected)
- `PUT /api/users/profile/:userId` - Update user profile (protected)
- `GET /api/users/team` - Get team members (protected)
- `GET /api/users/status/:userId` - Get user status (protected)
- `PUT /api/users/status/:userId` - Update user status (protected)

### Analytics
- `GET /api/analytics/user/:userId` - Get user analytics (protected)
- `GET /api/analytics/team` - Get team analytics (protected)

### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `PUT /api/admin/assign-manager/:userId` - Assign manager (admin only)
- `GET /api/admin/statistics` - Get system statistics (admin only)

## 🎨 UI/UX Features

### Beautiful Design
- 🎨 **Gradient Backgrounds** - Modern, professional color schemes
- 📱 **Fully Responsive** - Works on mobile, tablet, and desktop
- ✨ **Smooth Animations** - Framer Motion animations
- 🌙 **Dark Mode Ready** - Can easily add dark mode support
- 🎯 **Intuitive Navigation** - Clear, easy-to-use interface

### Real-time Features
- 🔔 **Live Status Updates** - WebSocket powered
- ⚡ **Instant Notifications** - Break status changes
- 📊 **Live Analytics** - Real-time data visualization

### Accessibility
- ♿ **WCAG 2.1 Compliant** - Accessible to all users
- 🎯 **Keyboard Navigation** - Full keyboard support
- 🔊 **Screen Reader Support** - Semantic HTML

## 🚀 Deployment

### Deploy Backend (Render/Railway)

**Using Render:**
1. Push code to GitHub
2. Connect Render to GitHub repository
3. Create Web Service
4. Set environment variables in Render dashboard
5. Deploy

**Using Railway:**
1. Connect GitHub account to Railway
2. Create new project from repository
3. Set environment variables
4. Deploy automatically

### Deploy Frontend (Vercel)

1. Push code to GitHub
2. Connect Vercel to GitHub repository
3. Set environment variables in Vercel dashboard
4. Deploy automatically on each push

### Example Environment Variables

**Backend (.env)**
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/breaktracker
JWT_SECRET=your-super-secret-key-change-this
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-vercel-app.vercel.app
```

**Frontend (.env)**
```
REACT_APP_API_BASE_URL=https://your-render-app.onrender.com/api
REACT_APP_SOCKET_URL=https://your-render-app.onrender.com
```

## 🧪 Testing

### Test Account Credentials

**Employee Account:**
- Email: `employee@example.com`
- Password: `password123`

**Manager Account:**
- Email: `manager@example.com`
- Password: `password123`

**Admin Account:**
- Email: `admin@example.com`
- Password: `password123`

## 📊 Sample Data

You can seed the database with sample data for testing.

## 🔐 Security Features

- ✅ **JWT Authentication** - Secure token-based auth
- 🔒 **Password Hashing** - Bcryptjs encryption
- 🛡️ **CORS Protection** - Cross-origin requests validation
- 🔑 **Role-based Access Control** - Employee, Manager, Admin roles
- 📝 **Input Validation** - Express validator
- 🚫 **Rate Limiting** - Prevent abuse (can be added)

## 📈 Performance

- ⚡ **Fast API Response** - Optimized queries
- 📦 **Code Splitting** - Lazy loading components
- 🎯 **Caching** - React Query caching
- 📊 **Optimized Images** - Compressed assets
- 🚀 **CDN Ready** - Frontend optimized for CDN

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this project for personal or commercial use.

## 🙏 Support

If you find this project helpful, please:
- ⭐ Star the repository
- 🐛 Report bugs and issues
- 💡 Suggest new features
- 🤝 Contribute to the project

## 📞 Contact

- **Author:** Sainath Sabale
- **Email:** sainathsabale03@gmail.com
- **GitHub:** [@SainathSabale03](https://github.com/SainathSabale03)

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Node.js Documentation](https://nodejs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Express.js Guide](https://expressjs.com)

## 🗺️ Roadmap

- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Mobile app (React Native)
- [ ] Advanced reporting
- [ ] Custom dashboard widgets
- [ ] Break recommendation AI
- [ ] Integration with calendar apps
- [ ] Slack/Teams integration

## 📄 License

MIT License - See LICENSE file for details

---

**Made with ❤️ by Sainath Sabale** | **BreakTracker-Pro** © 2024
