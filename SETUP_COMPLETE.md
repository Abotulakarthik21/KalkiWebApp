# KaliWebApp - Complete Setup Checklist

## ✅ Prerequisites  
- [ ] Node.js v18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Neo4j running (Docker or Desktop app)
- [ ] Port 5000 available
- [ ] Port 5173 available

---

## 📦 Backend Setup

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```
Check for errors. Should complete successfully.

### 2. Create Environment File
```bash
cp .env.example .env
```

### 3. Edit `.env` File
Update these values:
```env
# REQUIRED - Change these!
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your_database_password

# Optional but recommended
JWT_SECRET=your-random-secret-key-change-this

# Keep as-is for development
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

### 4. Start Neo4j Database
**Option A - Using Docker:**
```bash
docker-compose up -d neo4j
```

**Option B - Using Neo4j Desktop:**
1. Open Neo4j Desktop app
2. Find your database
3. Click "Start"
4. Wait for "Running" status

### 5. Test Backend Connection
```bash
cd backend
npm run dev
```

**Expected output:**
```
✅ Neo4j connected successfully
✅ Email service initialized
✨ Server is running on http://localhost:5000
```

**To verify it's working:**
- Open new terminal
- Run: `curl http://localhost:5000/api/health`
- Should return: `{"status":"Backend is running","timestamp":"..."}`

---

## 🎨 Frontend Setup

### 1. Install Frontend Dependencies
```bash
cd KaliWebApp  # Root directory
npm install
```

### 2. Check package.json exists
```bash
ls -la package.json
```

### 3. Start Frontend Dev Server
```bash
npm run dev
```

**Expected output:**
```
VITE v7.1.2  ready in 100ms

➜ Local:   http://localhost:5173/
```

### 4. Open in Browser
- Go to: `http://localhost:5173`
- Should see login page
- Open browser console (F12) for any errors

---

## 🧪 Testing the Full Flow

### Step 1: Check All Services Running
Open 3 terminals and verify:

**Terminal 1 (Neo4j):**
```bash
docker ps | grep neo4j
# Should show container running
```

**Terminal 2 (Backend):**
Check the running terminal shows "Server is running on http://localhost:5000"

**Terminal 3 (Frontend):**
Check the running terminal shows "Local: http://localhost:5173"

### Step 2: Test Backend
```bash
curl http://localhost:5000/api/health
```

Should return JSON (not error).

### Step 3: Test Frontend
1. Open http://localhost:5173 in browser
2. Should show login page (no errors in console)
3. Navbar should NOT be visible (not authenticated yet)

### Step 4: Test Registration
1. Click "Sign Up" or "Register"
2. Enter test data:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Password: Test1234
   - Confirm: Test1234
3. Click Register

**Check:**
- ✅ No "Network error" - means backend is running
- ✅ If no error, registration succeeded
- ❌ If "Network error" appears - backend not running, see Troubleshooting below

### Step 5: Test Login
1. Go to login page
2. Enter email: test@example.com
3. Enter password: Test1234
4. Click Login

**Check:**
- ✅ Navbar appears (you're logged in)
- ✅ You can see Home, Events, Members, Certification
- ✅ Click Logout - navbar disappears, returns to login

---

## 🔍 Troubleshooting

### Problem: "Network error: Failed to fetch" on Register/Login

**Root Cause:** Backend not running or not accessible

**Solution:**
1. Check Terminal 2 (where backend started)
   - Should show: "✨ Server is running on http://localhost:5000"
   - If not, backend crashed - look for error messages
   
2. Verify backend is accessible:
   ```bash
   curl http://localhost:5000/api/health
   ```
   - If this fails → backend is not running
   - If this works → connection issue

3. Start backend:
   ```bash
   cd backend
   npm run dev
   ```

4. Make sure Neo4j is running
   ```bash
   docker-compose up -d neo4j
   # OR click Start in Neo4j Desktop
   ```

### Problem: Neo4j Connection Failed

**Solution:**
1. Check Neo4j is running:
   ```bash
   docker ps | grep neo4j
   # OR check Neo4j Desktop
   ```

2. Wait 15 seconds for Neo4j to fully start

3. Check credentials in `backend/.env`:
   ```env
   NEO4J_URI=bolt://localhost:7687
   NEO4J_USER=neo4j
   NEO4J_PASSWORD=correct-password-here
   ```

4. Test Neo4j connection:
   ```bash
   curl http://localhost:7474/
   ```

### Problem: Port Already in Use

**Port 5000 (Backend):**
```bash
# Linux/Mac:
lsof -ti:5000 | xargs kill -9

# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force

# Or change in backend/.env:
PORT=5001
```

**Port 5173 (Frontend):**
```bash
# Linux/Mac:
lsof -ti:5173 | xargs kill -9

# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process -Force
```

### Problem: "Cannot find module" Error

```bash
cd backend
rm -rf node_modules
npm install
npm list  # Verify packages installed
npm run dev
```

### Problem: .env File Not Found

```bash
cd backend
cp .env.example .env
# Now edit .env with your database password
```

---

## 📊 Environment Verification

Run this script to check your setup:

```bash
# Check Node.js
node --version

# Check npm
npm --version

# Check backend folder exists
ls -la backend/package.json

# Check frontend folder exists
ls -la package.json

# Check .env exists
ls -la backend/.env

# Check Neo4j running
docker-compose ps
# OR open Neo4j Desktop

# Check backend running
curl http://localhost:5000/api/health

# Check frontend running
curl http://localhost:5173
```

---

## 📋 Final Checklist Before Testing

- [ ] Node.js and npm installed
- [ ] `backend/.env` file created with values
- [ ] Neo4j running
- [ ] `npm install` completed in backend/
- [ ] `npm install` completed in KaliWebApp/ (root)
- [ ] Backend started with `npm run dev`
- [ ] Frontend started with `npm run dev`
- [ ] Can access http://localhost:5173 in browser
- [ ] Backend health check returns JSON
- [ ] No errors in browser console (F12)
- [ ] Navbar NOT visible on login page (correct - not authenticated)

---

## 🚀 Success Indicators

✅ **Setup Complete If:**
1. Frontend shows at http://localhost:5173
2. Login page loads without network errors
3. Can register new user without "Network error"
4. After login, navbar appears with menu
5. Can logout and return to login page
6. No red errors in browser console

---

## 📞 If Still Having Issues

1. **Check Terminal Outputs:**
   - Neo4j: `docker logs neo4j` (if using Docker)
   - Backend: Check the terminal where you ran `npm run dev`
   - Frontend: Check the terminal where you ran `npm run dev`

2. **Check Browser Console:**
   - Press F12 in browser
   - Click Console tab
   - Refresh page
   - Look for error messages

3. **Check Network Tab:**
   - Press F12 → Network tab
   - Try to register
   - Look for failed requests
   - Click on failed request for error details

4. **Check Backend Logs:**
   - Look at Terminal running backend
   - Look for red error messages
   - May show database or validation errors

---

**Created:** April 10, 2026
**Status:** Complete Setup Instructions
