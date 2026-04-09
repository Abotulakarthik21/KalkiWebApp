# KaliWebApp - Complete Setup Guide

This guide will help you set up the entire KaliWebApp project with both frontend and backend.

## 🎯 Project Overview

KaliWebApp is a full-stack web application with:

- **Frontend**: React with Vite (localhost:5173)
- **Backend**: Node.js/Express with Neo4j (localhost:5000)
- **Database**: Neo4j Graph Database

## 📦 Quick Start

### Step 1: Setup Database (Neo4j)

**Option A: Using Neo4j Desktop**

1. Download [Neo4j Desktop](https://neo4j.com/download-center/)
2. Install and open
3. Create a new project
4. Create a new database with password
5. Start the database
6. Note the bolt URI (usually `bolt://localhost:7687`)

**Option B: Using Docker**

```bash
docker run -d \
  --name neo4j \
  -p 7687:7687 \
  -p 7474:7474 \
  -e NEO4J_AUTH=neo4j/password \
  neo4j:latest
```

### Step 2: Setup Backend

```bash
# Navigate to backend
cd KaliWebApp/backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# Important: Update NEO4J_USER, NEO4J_PASSWORD, SMTP credentials
```

**Edit backend/.env:**

```env
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your-database-password
JWT_SECRET=change-this-to-random-string
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**Generate Gmail App Password:**

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Factor Authentication
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Select Mail and Windows Computer
5. Copy the 16-character password
6. Use it as `SMTP_PASS`

**Start backend:**

```bash
npm run dev
```

Expected output:

```
✅ Neo4j connected successfully
✅ Email service initialized
✨ Server is running on http://localhost:5000
```

### Step 3: Setup Frontend

```bash
# Navigate to frontend (from root)
cd KaliWebApp

# Install dependencies
npm install

# Start development server
npm run dev
```

Expected output:

```
VITE v7.1.2  ready in 123 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

### Step 4: Access the Application

1. Open browser and go to `http://localhost:5173`
2. Click "Register" to create an account
3. Check your email for verification link
4. Click the link to verify email
5. Login with your credentials

## 📚 Frontend Pages & Features

### Pages

- **Home** (`/`) - Main landing page with events overview
- **Events** (`/kalki/events`) - List of upcoming events
- **Members** (`/kalki/teamMems`) - Team members directory
- **Certification** (`/kalki/certification`) - Certificate verification

### Authentication Pages

- **Register** (`/register`) - Create new account
- **Login** (`/login`) - Sign in to account
- **Forgot Password** (`/forgot-password`) - Password recovery
- **Reset Password** (`/reset-password?token=...`) - Set new password
- **Verify Email** (`/verify-email?token=...`) - Email verification

## 🔌 API Endpoints Quick Reference

### Authentication

```
POST   /api/auth/register           - Create new user
POST   /api/auth/login              - Login user
GET    /api/auth/verify-email/:token - Verify email
POST   /api/auth/forgot-password    - Request password reset
POST   /api/auth/reset-password/:token - Reset password
```

### Users

```
GET    /api/users/profile           - Get current user (protected)
PUT    /api/users/profile           - Update profile (protected)
GET    /api/users/members           - Get all members
GET    /api/health                  - Health check
```

## 🗂️ Project Structure

```
KaliWebApp/
├── backend/                    # Node.js backend
│   ├── config/
│   │   ├── database.js        # Neo4j setup
│   │   └── emailService.js    # Email functionality
│   ├── middleware/
│   │   └── auth.js            # JWT authentication
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   └── userRoutes.js      # User endpoints
│   ├── services/
│   │   └── userService.js     # Business logic
│   ├── server.js              # Main server
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── src/                       # React frontend
│   ├── components/
│   │   ├── Navbar.jsx         # Navigation with auth
│   │   ├── Footer.jsx
│   │   ├── BoxesInfo.jsx
│   │   ├── CoordinatorCard.jsx
│   │   ├── MembersCard.jsx
│   │   └── Title.jsx
│   ├── pages/
│   │   ├── Home.jsx           # Home page
│   │   ├── Events.jsx         # Events page
│   │   ├── Members.jsx        # Members page
│   │   ├── CertificateVerification.jsx
│   │   ├── Login.jsx          # Login page
│   │   ├── Register.jsx       # Register page
│   │   ├── VerifyEmail.jsx    # Email verification
│   │   ├── ForgotPassword.jsx # Password reset request
│   │   └── ResetPassword.jsx  # Password reset form
│   ├── App.jsx                # Main app component
│   ├── main.jsx
│   └── index.css
│
├── public/                    # Static assets
├── package.json              # Frontend dependencies
├── vite.config.js           # Vite configuration
└── README.md
```

## 🔐 Security Checklist

- [ ] Change `JWT_SECRET` to a random string
- [ ] Set strong Neo4j password
- [ ] Enable Gmail 2FA before generating app password
- [ ] Never commit `.env` file to git
- [ ] Update `FRONTEND_URL` for production
- [ ] Use HTTPS in production
- [ ] Add rate limiting for production
- [ ] Set up database backups

## 🧪 Testing the System

### Test User Registration

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

### Test Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"test123456"
  }'
```

### Test Protected Endpoint

```bash
curl http://localhost:5000/api/users/members
```

## 🐛 Troubleshooting

### Backend Won't Start

1. Check if Neo4j is running
2. Verify `.env` file exists and has correct credentials
3. Check console for specific error messages
4. Try deleting `node_modules` and reinstalling

### Email Not Sending

1. Verify Gmail App Password (not regular password)
2. Check if 2FA is enabled on Gmail
3. Check spam folder
4. Verify `SMTP_USER` and `SMTP_PASS` in `.env`

### Frontend Can't Connect to Backend

1. Ensure backend server is running on port 5000
2. Check `FRONTEND_URL` in backend `.env`
3. Clear browser cache and reload
4. Check browser console for CORS errors

### Database Connection Issues

1. Ensure Neo4j is running
2. Verify bolt URI: `bolt://localhost:7687`
3. Check Neo4j username and password
4. Try connecting via Neo4j Browser at `http://localhost:7474`

## 📱 Available Features

- ✅ User Registration with validation
- ✅ Email verification with tokens
- ✅ Secure Login with JWT
- ✅ Password reset functionality
- ✅ User profile management
- ✅ Member directory
- ✅ Event management
- ✅ Certificate verification
- ✅ Responsive design with Tailwind CSS
- ✅ Secure authentication middleware

## 🚀 Deployment

### Frontend (Vercel/Netlify)

```bash
# Build
npm run build

# Deploy the dist folder
```

### Backend (Heroku/Railway)

```bash
# Update FRONTEND_URL to your deployed frontend
# Update NEO4J credentials to production database
# Deploy using: git push heroku main
```

## 📞 Support & Contact

For issues or questions:

- Check the backend README.md for detailed API docs
- Review browser console for error messages
- Check server console for backend errors

## 📝 Notes

- Keep `.env` file in `.gitignore`
- Restart backend after changing `.env`
- Clear localStorage if having auth issues: `localStorage.clear()`
- Always verify email before logging in
- Use strong passwords in production

Happy coding! 🚀
