# Quick Start Commands

## 🚀 Start Everything in Correct Order

### Terminal 1: Start Neo4j (if using Docker)
```bash
docker-compose up -d neo4j
```

Wait 10 seconds, then verify:
```bash
curl http://localhost:7474/
```

---

### Terminal 2: Start Backend Server
```bash
cd backend
npm install  # Only needed first time
npm run dev
```

**You should see:**
```
✅ Neo4j connected successfully
✅ Email service initialized
✨ Server is running on http://localhost:5000
```

---

### Terminal 3: Start Frontend
```bash
npm run dev
```

**You should see:**
```
VITE v7.1.2  ready in XXXms
➜ Local: http://localhost:5173/
```

---

## ✅ Verify Everything is Running

### Check Backend Health
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{"status":"Backend is running","timestamp":"2024-01-15T10:30:00Z"}
```

### Check Neo4j
```bash
curl http://localhost:7474/
```

Should return HTML (no error)

### Open Frontend
Open browser and go to: http://localhost:5173

---

## 🆘 Troubleshooting Quick Fixes

### Backend won't start - "Port 5000 already in use"
```bash
# Linux/Mac:
lsof -ti:5000 | xargs kill -9

# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process -Force

# Or change port in backend/.env:
PORT=5001
```

### Neo4j connection fails
1. Check Neo4j is running:
   - Neo4j Desktop: Click Start
   - Docker: `docker-compose up -d neo4j`
2. Check credentials in `backend/.env`:
   ```env
   NEO4J_URI=bolt://localhost:7687
   NEO4J_USER=neo4j
   NEO4J_PASSWORD=your-actual-password
   ```
3. Wait 15 seconds for Neo4j to fully start

### "Cannot find module" errors
```bash
cd backend
npm install
npm list  # Verify packages are installed
```

### Frontend shows "Network error"
1. Make sure backend is running on Terminal 2
2. Check backend logs for errors
3. Try: `curl http://localhost:5000/api/health`
4. Check browser console (F12) for detailed error

---

## 📝 Keep These Running

Do NOT close any of the 3 terminals while working. You need:
1. **Neo4j** (database) - Always running
2. **Backend** (API server) - Always running
3. **Frontend** (React dev server) - Always running

When done developing, you can close them, but while coding all 3 must be active.

---

## 🔐 Production Checklist (For Later)

- [ ] Set `NODE_ENV=production` in backend/.env
- [ ] Generate strong `JWT_SECRET` (use online tool)
- [ ] Use real `SMTP_HOST` and email credentials
- [ ] Set `FRONTEND_URL` to actual domain
- [ ] Use database backup in production
- [ ] Enable HTTPS
- [ ] Setup environment variables in deployment platform

---

Last Updated: April 10, 2026
