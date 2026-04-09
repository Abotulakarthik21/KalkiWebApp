# KaliWebApp Project Structure Overview

## Complete Backend Implementation

This document provides an overview of the KaliWebApp backend implementation with Neo4j, authentication, and email verification.

---

## 📁 Folder Structure

```
KaliWebApp/
│
├── backend/                          # Node.js/Express Backend
│   ├── config/
│   │   ├── database.js              # Neo4j connection & initialization
│   │   │   • initializeNeo4j()
│   │   │   • getDriver()
│   │   │   • createConstraints()
│   │   │   • closeNeo4j()
│   │   │
│   │   └── emailService.js          # Email service with Nodemailer
│   │       • initializeEmail()
│   │       • sendVerificationEmail()
│   │       • sendResetPasswordEmail()
│   │       • sendWelcomeEmail()
│   │
│   ├── middleware/
│   │   └── auth.js                  # JWT authentication
│   │       • generateToken()
│   │       • generateVerificationToken()
│   │       • generatePasswordResetToken()
│   │       • verifyToken()
│   │       • authenticateToken() [middleware]
│   │
│   ├── routes/
│   │   ├── authRoutes.js            # Authentication endpoints
│   │   │   POST   /register
│   │   │   POST   /login
│   │   │   GET    /verify-email/:token
│   │   │   POST   /forgot-password
│   │   │   POST   /reset-password/:token
│   │   │   GET    /me [protected]
│   │   │   PUT    /profile [protected]
│   │   │
│   │   └── userRoutes.js            # User management endpoints
│   │       GET    /profile
│   │       PUT    /profile
│   │       GET    /members
│   │
│   ├── services/
│   │   └── userService.js           # Business logic layer
│   │       • createUser()
│   │       • findUserByEmail()
│   │       • findUserById()
│   │       • verifyEmail()
│   │       • loginUser()
│   │       • requestPasswordReset()
│   │       • resetPassword()
│   │       • updateUserProfile()
│   │       • getUserWithDetails()
│   │
│   ├── server.js                    # Express server setup
│   ├── package.json                 # Backend dependencies
│   ├── .env.example                 # Environment template
│   ├── .gitignore
│   └── README.md                    # Backend documentation
│
├── src/                             # React Frontend
│   ├── pages/
│   │   ├── Home.jsx                # Home page
│   │   ├── Events.jsx              # Events listing
│   │   ├── Members.jsx             # Members directory
│   │   ├── CertificateVerification.jsx
│   │   ├── Login.jsx               # Login page (NEW)
│   │   ├── Register.jsx            # Register page (NEW)
│   │   ├── VerifyEmail.jsx         # Email verification (NEW)
│   │   ├── ForgotPassword.jsx      # Password reset request (NEW)
│   │   └── ResetPassword.jsx       # Password reset form (NEW)
│   │
│   ├── components/
│   │   ├── Navbar.jsx              # Navigation (UPDATED with auth)
│   │   ├── Footer.jsx
│   │   ├── Title.jsx
│   │   ├── BoxesInfo.jsx
│   │   ├── MembersCard.jsx
│   │   └── CoordinatorCard.jsx
│   │
│   ├── utils/                       # Utility functions (NEW)
│   │   ├── api.js                  # API call wrapper
│   │   │   • apiCall()
│   │   │   • authAPI
│   │   │   • userAPI
│   │   │   • healthCheck()
│   │   │
│   │   └── authHelper.js           # Auth helper functions
│   │       • saveAuth()
│   │       • getAuth()
│   │       • isAuthenticated()
│   │       • logout()
│   │       • getCurrentUser()
│   │       • updateUser()
│   │
│   ├── assets/
│   │   ├── assets.js
│   │   ├── gantletOfGames/
│   │   └── mems/
│   │
│   ├── App.jsx                     # Routes (UPDATED)
│   ├── main.jsx
│   └── index.css
│
├── public/                          # Static assets
│
├── Documentation Files (NEW)
│   ├── SETUP_GUIDE.md              # Complete setup instructions
│   ├── API_DOCUMENTATION.md        # API endpoints reference
│   ├── QUICK_COMMANDS.md           # Useful commands & shortcuts
│   └── PROJECT_STRUCTURE.md        # This file
│
├── Configuration Files (NEW)
│   ├── docker-compose.yml          # Docker Neo4j setup
│   ├── setup.sh                    # Linux/Mac setup script
│   ├── setup.bat                   # Windows setup script
│   └── .env.example                # Frontend env example
│
├── package.json                    # Frontend dependencies
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

## 🔄 API Flow Diagram

### Authentication Flow

```
Client (Frontend)
    ↓
    ├─→ POST /api/auth/register
    │   ↓
    │   Backend validates input
    │   Hash password with bcryptjs
    │   Create User node in Neo4j
    │   Generate verification token
    │   Send verification email
    │
    ├─→ GET /api/auth/verify-email/:token (Email link)
    │   ↓
    │   Verify JWT token
    │   Update User.isVerified = true
    │   Send welcome email
    │
    ├─→ POST /api/auth/login
    │   ↓
    │   Find user by email
    │   Check isVerified flag
    │   Compare password hash
    │   Generate JWT token
    │   Return token + user data
    │
    └─→ GET /api/auth/verify-email/:token
        ↓
        Include token in Authorization header
        Middleware verifies token
        Access protected endpoints
```

### Password Reset Flow

```
Client
    ↓
    ├─→ POST /api/auth/forgot-password
    │   ↓
    │   Find user by email
    │   Generate reset token
    │   Send reset email with token
    │
    └─→ POST /api/auth/reset-password/:token
        ↓
        Verify reset token
        Hash new password
        Update User.password
        Return success
```

---

## 🗄️ Neo4j Database Schema

### User Node

```cypher
MATCH (u:User) RETURN u

Properties:
{
  id: String (UUID),                    // Unique identifier
  firstName: String,                     // First name
  lastName: String,                      // Last name
  email: String,                         // Email (UNIQUE)
  password: String,                      // Hashed password
  isVerified: Boolean,                   // Email verified status
  verificationToken: String,             // Email verification token
  resetToken: String | null,            // Password reset token
  resetTokenExpiry: DateTime | null,    // Reset token expiry time
  createdAt: DateTime,                   // Account creation time
  updatedAt: DateTime                    // Last update time
}

Constraints:
  - UNIQUE email

Indexes:
  - email_index on (u:email)
  - verification_token_index on (u.verificationToken)
```

### Example Cypher Queries

```cypher
// Get all users
MATCH (u:User) RETURN u

// Get verified users
MATCH (u:User {isVerified: true}) RETURN u ORDER BY u.createdAt DESC

// Count total users
MATCH (u:User) RETURN count(u) as totalUsers

// Find user by email
MATCH (u:User {email: "user@example.com"}) RETURN u

// Get user with a specific ID
MATCH (u:User {id: "uuid-here"}) RETURN u

// Find unverified users (potential cleanup)
MATCH (u:User {isVerified: false}) RETURN u
```

---

## 📡 API Endpoints Summary

### Authentication (Public)

```
POST   /api/auth/register              Register new user
POST   /api/auth/login                 Login and get token
GET    /api/auth/verify-email/:token   Verify email address
POST   /api/auth/forgot-password       Request password reset
POST   /api/auth/reset-password/:token Reset password
```

### User (auth required)

```
GET    /api/users/profile              Get current user profile
PUT    /api/users/profile              Update profile
GET    /api/users/members              Get all members (public)
```

### System

```
GET    /api/health                     Health check
```

---

## 🔐 Security Implementation

### Password Security

- Bcryptjs with 10 salt rounds
- Salted hash stored in database
- Plain password never stored
- Comparison using bcrypt.compare()

### Token Security

- JWT with symmetric key (HS256)
- Token expiration: 7 days (configurable)
- Verification token: 24 hours
- Reset token: 1 hour
- Tokens validated on each protected request

### Email Security

- Verification tokens tied to user account
- One-time use tokens
- Automatic token expiry
- Email link includes token in URL
- SMTP with TLS/SSL encryption

### Input Validation

- express-validator on all endpoints
- Email format validation
- Password minimum length (6 chars)
- Name field trim and validation
- SQL injection prevention via Neo4j driver

---

## 🚀 Environment Variables

### Backend (.env)

```env
# Neo4j Database
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your-password

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=change-this-to-random-string
JWT_EXPIRE=7d

# SMTP (Email)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@kaliwebapp.com

# Frontend
FRONTEND_URL=http://localhost:5173

# Token Expiry
VERIFICATION_TOKEN_EXPIRY=24
```

### Frontend (.env.development.local)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📦 Dependencies

### Backend

```json
{
  "express": "4.18.2", // Web framework
  "neo4j-driver": "5.14.0", // Neo4j client
  "bcryptjs": "2.4.3", // Password hashing
  "jsonwebtoken": "9.1.2", // JWT tokens
  "nodemailer": "6.9.7", // Email service
  "dotenv": "16.3.1", // Environment variables
  "cors": "2.8.5", // Cross-origin support
  "express-validator": "7.0.0" // Input validation
}
```

### Frontend (Already installed)

```json
{
  "react": "19.1.1",
  "react-router-dom": "7.8.2",
  "react-dom": "19.1.1",
  "tailwindcss": "4.1.12",
  "lucide-react": "0.542.0"
}
```

---

## 🔄 Data Flow

### Registration Request

```
Frontend Form
    ↓
POST /register
    ↓
Validate email format
    ↓
Hash password
    ↓
Create User in Neo4j
    ↓
Generate verification token
    ↓
Send verification email
    ↓
Return user ID to frontend
```

### Login Request

```
Frontend Form
    ↓
POST /login
    ↓
Find user by email
    ↓
Check isVerified
    ↓
Compare password hash
    ↓
Generate JWT token
    ↓
Return token + user data
    ↓
Frontend stores in localStorage
```

### Protected Request

```
Frontend Request with Token
    ↓
Extract token from Authorization header
    ↓
Verify JWT signature
    ↓
Check expiration
    ↓
Extract userId from payload
    ↓
Process request
    ↓
Return response
```

---

## 🧪 Testing Checklist

- [ ] Register new user
- [ ] Check email for verification link
- [ ] Click verification link
- [ ] Login with credentials
- [ ] Access protected endpoints
- [ ] Logout
- [ ] Request password reset
- [ ] Reset password
- [ ] Login with new password
- [ ] View member list

---

## 📚 Documentation Files

| File                 | Purpose                     |
| -------------------- | --------------------------- |
| SETUP_GUIDE.md       | Complete setup instructions |
| API_DOCUMENTATION.md | API endpoints reference     |
| QUICK_COMMANDS.md    | Useful terminal commands    |
| backend/README.md    | Backend-specific info       |
| This file            | Project structure overview  |

---

## 🔧 Troubleshooting

See SETUP_GUIDE.md and QUICK_COMMANDS.md for common issues and solutions.

---

## ✨ What's Implemented

✅ User Registration with email verification
✅ Secure Login with JWT
✅ Password Reset functionality
✅ User Profile management
✅ Member Directory
✅ Neo4j database integration
✅ Email service (Nodemailer)
✅ Input validation
✅ Error handling
✅ CORS configuration
✅ Protected API endpoints
✅ Frontend components
✅ Complete documentation

---

## 🚀 What's Next

- Deploy backend to hosting service (Railway, Heroku)
- Deploy frontend to hosting (Vercel, Netlify)
- Add refresh tokens
- Add rate limiting
- Add admin dashboard
- Add 2FA authentication
- Add social login
- Add profile pictures
- Add automated tests
- Add user roles

---

Last Updated: January 15, 2024
