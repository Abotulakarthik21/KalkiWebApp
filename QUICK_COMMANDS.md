# KaliWebApp Backend Quick Commands

## Installation & Setup

```bash
# Navigate to backend
cd KaliWebApp/backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env with your configuration
# (Update: NEO4J credentials, JWT_SECRET, SMTP settings)
```

## Running the Backend

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

## Database Management

### Access Neo4j Browser

```
http://localhost:7474/browser/
```

### Verify Neo4j Connection

```bash
node -e "const neo4j = require('neo4j-driver');
const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'password'));
driver.verifyConnectivity().then(() => console.log('✅ Connected')).catch(e => console.log('❌ Error', e.message));"
```

## Testing API Endpoints

### Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"Test",
    "lastName":"User",
    "email":"test@example.com",
    "password":"test123456"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"test123456"
  }'
```

### Get All Members

```bash
curl http://localhost:5000/api/users/members
```

### Health Check

```bash
curl http://localhost:5000/api/health
```

## Frontend Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

### Backend (.env)

```env
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=password

JWT_SECRET=your-secret-key
JWT_EXPIRE=7d

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=app-password

FRONTEND_URL=http://localhost:5173
PORT=5000
```

### Frontend (.env.development.local)

```env
VITE_API_URL=http://localhost:5000/api
```

## Package Installation

### Backend Dependencies

```bash
# Already in package.json, just run npm install
npm install
```

### Add New Package

```bash
npm install package-name
```

## Common Issues & Solutions

### Port Already in Use

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
PORT=5001
```

### Neo4j Connection Error

```bash
# Check if Neo4j is running
# Mac/Linux:
neo4j console

# Windows: Use Neo4j Desktop or:
neo4j-admin server start
```

### Email Not Sending

1. Check Gmail App Password
2. Verify credentials in .env
3. Check inbox/spam folder
4. Ensure SMTP settings are correct

### Clear Database (Development Only)

```bash
# Connect to Neo4j Browser and run:
MATCH (n) DETACH DELETE n;
```

## Logs & Debugging

### View Server Logs

```bash
# Backend will show logs in terminal
npm run dev
```

### Enable Verbose Logging

```bash
# Add this to code
console.log('Debug message:', variable)
```

## Deployment

### Deploy to Heroku

```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login
heroku login

# Create app
heroku create kaliwebapp-backend

# Push code
git push heroku main

# View logs
heroku logs --tail
```

### Deploy to Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

## Useful Neo4j Queries

```cypher
# Get all users
MATCH (u:User) RETURN u

# Get all verified users
MATCH (u:User {isVerified: true}) RETURN u

# Count users
MATCH (u:User) RETURN count(u) as totalUsers

# Find user by email
MATCH (u:User {email: "user@example.com"}) RETURN u

# Delete all users (be careful!)
MATCH (u:User) DETACH DELETE u

# Find unverified users
MATCH (u:User {isVerified: false}) RETURN u ORDER BY u.createdAt DESC
```

## Project URLs

| Service       | URL                   | Default Port |
| ------------- | --------------------- | ------------ |
| Frontend      | http://localhost:5173 | 5173         |
| Backend       | http://localhost:5000 | 5000         |
| Neo4j Browser | http://localhost:7474 | 7474         |
| Neo4j Bolt    | bolt://localhost      | 7687         |

## File Locations

| Item           | Path                |
| -------------- | ------------------- |
| Backend Server | `backend/server.js` |
| Routes         | `backend/routes/`   |
| Services       | `backend/services/` |
| Config         | `backend/config/`   |
| Frontend App   | `src/App.jsx`       |
| Auth Pages     | `src/pages/`        |
| Components     | `src/components/`   |
| API Utils      | `src/utils/api.js`  |

## Need Help?

1. Check `SETUP_GUIDE.md` for detailed setup instructions
2. Check `API_DOCUMENTATION.md` for API details
3. Check `backend/README.md` for backend-specific info
4. Check console logs for error messages
5. Review `.env.example` for required variables

---

Last Updated: 2024-01-15
