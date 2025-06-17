# 🧪 Netlify Deployment Test Checklist

## 📋 Pre-Deployment Tests

### ✅ Local Development Test
```bash
# 1. Install dependencies
npm run install:all

# 2. Start development
npm run dev

# 3. Test endpoints locally
curl http://localhost:5000/api/health
```

### ✅ Build Test
```bash
# Test frontend build
cd frontend
npm run build

# Check dist folder
ls -la dist/
```

## 🚀 Deployment Tests

### 1. **Basic Connectivity**
- [ ] Site loads: `https://your-site.netlify.app`
- [ ] No console errors
- [ ] Assets loading correctly

### 2. **API Function Tests**
```bash
# Health check
curl https://your-site.netlify.app/.netlify/functions/api/health

# Categories endpoint
curl https://your-site.netlify.app/.netlify/functions/api/categories

# Products endpoint
curl https://your-site.netlify.app/.netlify/functions/api/products
```

### 3. **Database Connectivity**
- [ ] MongoDB connection active
- [ ] Seed data loaded
- [ ] CRUD operations working

### 4. **Frontend Routes Test**
- [ ] Homepage: `/`
- [ ] Shop: `/shop`
- [ ] About: `/about`
- [ ] Contact: `/contact`
- [ ] Admin Login: `/admin`
- [ ] Blog: `/blog`

### 5. **Admin Panel Test**
- [ ] Admin login working
- [ ] Dashboard accessible
- [ ] Product CRUD operations
- [ ] Category management
- [ ] Blog management
- [ ] File uploads working

### 6. **CORS & Security**
- [ ] No CORS errors in browser
- [ ] Security headers present
- [ ] API accessible from frontend

### 7. **Performance Test**
- [ ] Page load speed < 3s
- [ ] Lighthouse score > 80
- [ ] Mobile responsive
- [ ] Images optimized

## 🔧 Debug Commands

### Check Netlify Logs
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login and link site
netlify login
netlify link

# View function logs
netlify functions:log
```

### Check Environment Variables
```bash
# In Netlify function console
console.log('MONGO_URI:', process.env.MONGO_URI ? 'SET' : 'NOT SET');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('NETLIFY:', process.env.NETLIFY);
```

## 🐛 Common Issues & Solutions

### Issue: Functions not working
```bash
# Check if functions are in correct directory
ls netlify/functions/

# Verify build includes backend files
netlify deploy --prod --functions netlify/functions
```

### Issue: Database connection fails
```bash
# Verify MONGO_URI in environment variables
# Check MongoDB Atlas IP whitelist (0.0.0.0/0 for serverless)
```

### Issue: CORS errors
```bash
# Verify CORS settings in backend/server.js
# Check Netlify domain in allowed origins
```

### Issue: Build fails
```bash
# Check Node.js version
# Verify all dependencies in package.json
# Check build logs in Netlify dashboard
```

## 📊 Success Criteria

✅ **All systems working if:**
- Frontend loads without errors
- API responds to health check
- Database operations successful
- Admin panel accessible
- Performance metrics good
- Mobile responsive
- Security headers present

## 📞 Support Resources

- **Netlify Docs**: https://docs.netlify.com/
- **Functions Docs**: https://docs.netlify.com/functions/
- **Debugging Guide**: https://docs.netlify.com/functions/debug/
- **Community**: https://community.netlify.com/

---
🎯 **Complete this checklist to ensure successful deployment!**
