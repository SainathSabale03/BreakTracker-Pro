# BreakTracker-Pro - Setup & Configuration Guide

## Prerequisites

- Node.js 14.x or higher
- npm or yarn package manager
- MongoDB Atlas account (free)
- GitHub account (for deployment)

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SainathSabale03/BreakTracker-Pro.git
cd BreakTracker-Pro
```

### 2. Backend Configuration

#### Create .env File

```bash
cp .env.example .env
```

#### Edit .env File

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/breaktracker

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=development

# Client
CLIENT_URL=http://localhost:3000

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
```

#### Install Backend Dependencies

```bash
npm install
```

#### Start Backend Server

```bash
npm run server
# Server running on http://localhost:5000
```

### 3. Frontend Configuration

#### Navigate to Client Directory

```bash
cd client
```

#### Create .env File

```bash
cp .env.example .env
```

#### Edit .env File

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

#### Install Frontend Dependencies

```bash
npm install
```

#### Start Frontend Development Server

```bash
npm start
# App running on http://localhost:3000
```

### 4. Run Both Servers Together

From the root directory:

```bash
npm run dev
```

## MongoDB Atlas Setup

### Create Free Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create new project
4. Create cluster (free tier)
5. Wait for cluster to deploy (5-10 minutes)

### Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<password>` with your database password
5. Add connection string to `.env` file

### Whitelist IP Address

1. Go to Network Access
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (for development)
4. For production, add specific IP addresses

## Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|----------|
| MONGODB_URI | MongoDB connection string | mongodb+srv://... |
| JWT_SECRET | Secret key for JWT tokens | your_secret_key |
| JWT_EXPIRE | Token expiration time | 7d |
| PORT | Server port | 5000 |
| NODE_ENV | Environment type | development/production |
| CLIENT_URL | Frontend URL | http://localhost:3000 |
| REACT_APP_API_BASE_URL | Backend API URL | http://localhost:5000/api |
| REACT_APP_SOCKET_URL | WebSocket URL | http://localhost:5000 |

## Project Structure

```
BreakTracker-Pro/
├── config/           # Configuration files
├── middleware/       # Express middleware
├── models/          # MongoDB schemas
├── routes/          # API routes
├── client/          # React frontend
│   ├── public/      # Static files
│   ├── src/         # React components
│   └── package.json
├── server.js        # Main server file
├── package.json     # Backend dependencies
└── README.md        # Documentation
```

## Troubleshooting

### MongoDB Connection Error

**Error:** `MongoNetworkError`

**Solution:**
- Check connection string format
- Verify IP whitelist in MongoDB Atlas
- Ensure database name is correct
- Check username and password

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Kill process on port 5000
kill -9 $(lsof -t -i :5000)  # Mac/Linux
netstat -ano | findstr :5000  # Windows
taskkill /PID <PID> /F
```

### Module Not Found

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
npm install
```

### CORS Errors

**Error:** `Access to XMLHttpRequest blocked by CORS`

**Solution:**
- Update CLIENT_URL in backend .env
- Ensure frontend URL matches
- Restart backend server

## Testing the Application

### Test Employee Flow

1. Register new employee account
2. Login with credentials
3. Start a break
4. End the break
5. View break history

### Test Manager Flow

1. Create manager account
2. Login as manager
3. View team members
4. Check team analytics
5. Monitor break patterns

### Test Admin Flow

1. Create admin account
2. Login as admin
3. View system statistics
4. Manage users
5. Assign managers

## Performance Tips

1. **Database Indexing**
   - Indexes on userId, startTime
   - Improves query performance

2. **Caching**
   - Use React Query for API caching
   - Reduce unnecessary API calls

3. **Code Splitting**
   - Lazy load components
   - Improve initial load time

4. **Asset Optimization**
   - Compress images
   - Minify CSS/JS
   - Use CDN for static files

## Security Best Practices

1. **JWT Secret**
   - Use strong, random secret
   - Never commit to GitHub
   - Rotate regularly

2. **Password Hashing**
   - Bcryptjs with salt rounds
   - Never store plain passwords

3. **HTTPS**
   - Always use HTTPS in production
   - Get SSL certificate from Let's Encrypt

4. **Environment Variables**
   - Never hardcode secrets
   - Use .env files
   - Add to .gitignore

5. **Input Validation**
   - Validate all user inputs
   - Use express-validator
   - Sanitize data

## Next Steps

1. ✅ Setup local development
2. ✅ Test core features
3. ✅ Customize branding
4. ✅ Deploy to production
5. ✅ Setup monitoring
6. ✅ Configure backups

## Support

For issues or questions:
- Email: sainathsabale03@gmail.com
- GitHub Issues: [Report Bug](https://github.com/SainathSabale03/BreakTracker-Pro/issues)
- Discussions: [Ask Question](https://github.com/SainathSabale03/BreakTracker-Pro/discussions)

## Additional Resources

- [React Documentation](https://react.dev)
- [Node.js Guide](https://nodejs.org/docs)
- [MongoDB Docs](https://docs.mongodb.com)
- [Express.js Guide](https://expressjs.com)
- [Tailwind CSS](https://tailwindcss.com)

---

**Happy Coding! 🚀**
