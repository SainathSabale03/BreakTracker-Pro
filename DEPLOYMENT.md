# BreakTracker-Pro Deployment Guide

## Quick Start Guide

### Local Development

1. **Install Dependencies**
   ```bash
   npm run install-all
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   cd client && cp .env.example .env && cd ..
   ```

3. **Update .env Files**
   - Add MongoDB connection string
   - Generate JWT secret
   - Set API URLs

4. **Start Development Servers**
   ```bash
   npm run dev
   ```
   - Backend: http://localhost:5000
   - Frontend: http://localhost:3000

## Production Deployment

### Option 1: Deploy to Render + Vercel (Recommended)

#### Step 1: Deploy Backend to Render

1. Create account at [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment Variables:
     ```
     MONGODB_URI=your_mongodb_connection
     JWT_SECRET=generate_secure_key
     CLIENT_URL=your_vercel_frontend_url
     NODE_ENV=production
     ```
5. Deploy

#### Step 2: Deploy Frontend to Vercel

1. Create account at [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Configure:
   - Framework: React
   - Build Command: `npm run build`
   - Output Directory: `client/build`
   - Environment Variables:
     ```
     REACT_APP_API_BASE_URL=your_render_backend_url/api
     REACT_APP_SOCKET_URL=your_render_backend_url
     ```
4. Deploy

### Option 2: Deploy to Railway

1. Create account at [railway.app](https://railway.app)
2. Connect GitHub repository
3. Add MongoDB plugin
4. Set environment variables
5. Deploy automatically

### Option 3: Deploy to Heroku

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

## Database Setup

### MongoDB Atlas (Free Tier)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Add to environment variables

## Monitoring

### Logs
- Render: View in dashboard
- Vercel: View in deployments
- Railway: Real-time logs available

### Performance
- Use MongoDB Atlas performance advisor
- Monitor API response times
- Check frontend build size

## Troubleshooting

### Connection Issues
- Verify MongoDB connection string
- Check IP whitelist on MongoDB Atlas
- Ensure CORS is configured correctly

### Build Failures
- Clear cache and rebuild
- Check Node version compatibility
- Review build logs

### Runtime Errors
- Check server logs
- Verify environment variables
- Test API endpoints manually

## Security Checklist

- ✅ Change default JWT secret
- ✅ Use HTTPS everywhere
- ✅ Add rate limiting
- ✅ Validate all inputs
- ✅ Use environment variables for secrets
- ✅ Enable CORS only for frontend domain
- ✅ Keep dependencies updated
- ✅ Use strong passwords

## Performance Optimization

- Enable gzip compression
- Use CDN for static assets
- Optimize images
- Implement database indexing
- Use React.memo for components
- Lazy load routes

## Backup & Recovery

### MongoDB Backup
- Enable automatic backups in MongoDB Atlas
- Export data regularly
- Test restore procedures

### Code Backup
- Use GitHub as backup
- Tag releases
- Keep changelog

## Scaling

### Horizontal Scaling
- Load balancer setup
- Multiple API instances
- Sticky sessions for WebSocket

### Vertical Scaling
- Upgrade server resources
- Optimize code
- Database indexing

## Support

For deployment issues, contact: sainathsabale03@gmail.com
