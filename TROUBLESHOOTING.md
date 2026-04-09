# KaliWebApp - Network Error Troubleshooting

## ❌ "Network error: Failed to fetch" - Solutions

### Quick Checklist

- [ ] Is **Neo4j** running? (Check http://localhost:7474)
- [ ] Is **Backend** running? (Check http://localhost:5000/api/health)
- [ ] Is **Frontend** running? (Check http://localhost:5173)
- [ ] Is `backend/.env` created and configured?
- [ ] Did you run `npm install` in backend folder?

---

## 🔧 Step-by-Step Fix

### Step 1: Check if Backend is Running

**In a terminal, run:**
```bash
curl http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "Backend is running",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

If this fails, continue with Steps 2-5.

---

### Step 2: Start Neo4j Database

**Option A: Using Neo4j Desktop (Recommended)**
1. Open Neo4j Desktop application
2. Find your database project
3. Click the **Start** button
4. Wait for it to show "Running"
5. Verify at http://localhost:7474/browser/

**Option B: Using Docker**
```bash
docker-compose up -d neo4j
```

**Verify it's running:**
```bash
curl http://localhost:7474/
```

---

### Step 3: Setup Backend Environment File

**Check if `.env` exists in backend folder:**
```bash
cd backend
ls -la .env
```

**If it doesn't exist, create it:**
```bash
cp .env.example .env
```

**Edit `.env` with your configuration:**
```env
# Required - Update these values!
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your-database-password

# Keep these as defaults
PORT=5000
NODE_ENV=development
JWT_SECRET=change-this-to-random-string-in-production
FRONTEND_URL=http://localhost:5173

# Email (Optional for now, but needed for full features)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@kaliwebapp.com
```

---

### Step 4: Install Backend Dependencies

**From the backend folder:**
```bash
npm install
```

**Verify installation:**
```bash
npm list | grep -E "(express|neo4j|cors)"
```

---

### Step 5: Start Backend Server

**Run the backend:**
```bash
npm run dev
```

**You should see:**
```
✅ Neo4j connected successfully
✅ Email service initialized
✨ Server is running on http://localhost:5000
```

If you see **errors**, note them and continue to Step 6.

---

### Step 6: Start Frontend Server

**In a new terminal, from root folder:**
```bash
npm run dev
```

**You should see:**
```
VITE v7.1.2  ready in 123 ms
➜  Local:   http://localhost:5173/
```

---

## 🔍 Common Issues & Fixes

### Issue: "Connection refused" on port 7687
**Cause:** Neo4j not running

**Fix:**
```bash
# Neo4j Desktop: Click Start button
# OR Docker:
docker-compose up -d neo4j
docker logs neo4j  # Check status
```

### Issue: "Cannot find module 'express'"
**Cause:** Dependencies not installed

**Fix:**
```bash
cd backend
npm install
npm list express  # Verify it's installed
```

### Issue: "ENOENT: no such file or directory, open '.env'"
**Cause:** .env file doesn't exist

**Fix:**
```bash
cd backend
cp .env.example .env
# Edit .env with your values
```

### Issue: "Neo4j connection failed: Invalid URI"
**Cause:** Wrong NEO4J_URI in .env

**Fix:**
```env
# Check these values in your .env:
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your-actual-password
```

### Issue: "CORS error" or "Failed to fetch"
**Multiple causes:**

1. **Backend not running:**
   - Check if port 5000 is in use
   - Kill process: `lsof -ti:5000 | xargs kill -9`
   - Try different port: Change `PORT=5001` in .env

2. **Frontend URL mismatch:**
   - Backend expects frontend at: `http://localhost:5173`
   - If running elsewhere, update `FRONTEND_URL` in .env

3. **API endpoint wrong:**
   - Check Register.jsx, Login.jsx for fetch URL
   - Should be: `http://localhost:5000/api/auth/...`

---

## ✅ Verification Steps

Run these commands in separate terminals to verify everything:

**Terminal 1 - Check Neo4j:**
```bash
curl http://localhost:7474/
# Should return HTML (not error)
```

**Terminal 2 - Check Backend:**
```bash
curl http://localhost:5000/api/health
# Should return JSON response
```

**Terminal 3 - Check Frontend:**
```bash
# Open browser at http://localhost:5173
# Should load without errors
```

---

## 📋 Full Setup Sequence

If still having issues, follow this **exact sequence**:

```bash
# Terminal 1: Start Neo4j
docker-compose up -d neo4j
# Wait 10 seconds for it to start

# Terminal 2: Start Backend
cd backend
cp .env.example .env
# Edit .env (set NEO4J_PASSWORD correctly)
npm install
npm run dev
# Wait for "Server is running on http://localhost:5000"

# Terminal 3: Start Frontend
cd KaliWebApp  # Go to root
npm install
npm run dev
# Open http://localhost:5173 in browser
```

---

## 🆘 Still Having Issues?

**Check these logs:**

1. **Backend logs** (Terminal running `npm run dev`):
   - Look for error messages
   - Should show connection success messages

2. **Neo4j logs**:
   ```bash
   docker logs neo4j
   ```

3. **Browser console** (F12 in browser):
   - Open DevTools
   - Go to Console tab
   - Refresh page
   - Look for error messages

4. **Network tab** (F12 → Network):
   - Try to register
   - Look for failed requests
   - Click on the failed request to see error details

---

## 💡 Pro Tips

- **Use different terminals** for each service (Neo4j, Backend, Frontend)
- **Don't close terminals** while developing
- **Check logs regularly** for error messages
- **Restart in order:** Neo4j → Backend → Frontend
- **Clear browser cache** if having issues: Ctrl+Shift+Delete

---

## 🚀 Once Everything is Running

1. Go to http://localhost:5173
2. Click "Register" (or see login page)
3. Fill in the form
4. Check console if registration fails
5. Check backend logs for errors

---

## Need More Help?

1. Check `SETUP_GUIDE.md` for detailed setup
2. Check `QUICK_COMMANDS.md` for useful commands
3. Check backend README.md for API details
4. Share error logs from backend terminal

---

Last Updated: April 10, 2026
