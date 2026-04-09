# KaliWebApp Backend

Complete backend solution for KaliWebApp with Neo4j database, JWT authentication, email verification, and password reset functionality.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication
- **Email Verification**: Automated email verification on registration
- **Password Reset**: Secure password reset with token-based verification
- **Neo4j Integration**: Graph database for scalable user management
- **CORS Enabled**: Frontend-backend communication support
- **Input Validation**: Express validator for all API endpoints
- **Error Handling**: Comprehensive error handling and logging

## 📋 Prerequisites

Before you begin, ensure you have:

- Node.js (v14 or higher)
- Neo4j Database (v4.0+) - [Download here](https://neo4j.com/download-center/)
- npm or yarn package manager
- Gmail account (for email verification)

## ⚙️ Installation & Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend folder:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Neo4j Configuration
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your-password

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d

# Email Configuration (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
EMAIL_FROM=noreply@kaliwebapp.com

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Verification Token Expiry (in hours)
VERIFICATION_TOKEN_EXPIRY=24
```

### 3. Start Neo4j Database

**Using Neo4j Desktop:**

1. Open Neo4j Desktop
2. Create a new project
3. Create a new database (default is usually password: neo4j)
4. Start the database
5. Update `NEO4J_URI` and `NEO4J_PASSWORD` in `.env`

**Or using Docker:**

```bash
docker run -d \
  --name neo4j \
  -p 7687:7687 \
  -p 7474:7474 \
  -e NEO4J_AUTH=neo4j/password \
  neo4j:latest
```

### 4. Gmail App Password Setup

For email verification to work:

1. Enable 2-Factor Authentication on your Google Account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the 16-character password in `SMTP_PASS`

### 5. Start Backend Server

```bash
npm run dev
```

You should see:

```
✅ Neo4j connected successfully
✅ Email service initialized
✨ Server is running on http://localhost:5000
```

## 📡 API Endpoints

### Authentication Routes

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "id": "uuid",
  "email": "john@example.com",
  "message": "User created successfully. Please check your email to verify your account."
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

#### Verify Email

```http
GET /api/auth/verify-email/:token
```

**Response:**

```json
{
  "message": "Email verified successfully",
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "firstName": "John"
  }
}
```

#### Request Password Reset

```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "message": "If user exists, password reset link has been sent"
}
```

#### Reset Password

```http
POST /api/auth/reset-password/:token
Content-Type: application/json

{
  "password": "newpassword123"
}
```

**Response:**

```json
{
  "message": "Password reset successfully",
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "firstName": "John"
  }
}
```

### User Routes

#### Get Current User Profile

```http
GET /api/users/profile
Authorization: Bearer {token}
```

**Response:**

```json
{
  "user": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "isVerified": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Get All Members

```http
GET /api/users/members
```

**Response:**

```json
{
  "count": 5,
  "members": [
    {
      "id": "uuid",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "isVerified": true
    }
  ]
}
```

#### Update User Profile

```http
PUT /api/users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith"
}
```

**Response:**

```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "uuid",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "john@example.com"
  }
}
```

### Health Check

```http
GET /api/health
```

**Response:**

```json
{
  "status": "Backend is running",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 🔐 Security Notes

1. **JWT Secret**: Change `JWT_SECRET` in production to a strong random string
2. **CORS**: Update `FRONTEND_URL` to match your production frontend URL
3. **Password**: Always use strong passwords for Neo4j
4. **Email**: Never commit `.env` file with real credentials
5. **HTTPS**: Use HTTPS in production for all API calls

## 🧪 Testing Endpoints

You can test the API using:

- **Postman**: Import the endpoints above
- **cURL**: Use curl commands with the endpoints
- **Frontend**: Use the provided React components

### Example cURL Commands

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"John",
    "lastName":"Doe",
    "email":"john@example.com",
    "password":"password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@example.com",
    "password":"password123"
  }'

# Get Members
curl http://localhost:5000/api/users/members
```

## 📁 Project Structure

```
backend/
├── config/
│   ├── database.js          # Neo4j connection and initialization
│   └── emailService.js      # Email sending functionality
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── routes/
│   ├── authRoutes.js        # Authentication endpoints
│   └── userRoutes.js        # User management endpoints
├── services/
│   └── userService.js       # User business logic
├── server.js                # Express server setup
├── package.json
├── .env.example
└── .gitignore
```

## 🛠️ Troubleshooting

### Neo4j Connection Error

- Ensure Neo4j is running
- Check `NEO4J_URI` and credentials in `.env`
- Verify the port (default: 7687 for bolt)

### Email Not Sending

- Verify Gmail App Password is correct
- Check if 2FA is enabled on Gmail
- Ensure `SMTP_USER` and `SMTP_PASS` are correct

### JWT Token Issues

- Token might be expired (check `JWT_EXPIRE`)
- Ensure token is sent in `Authorization: Bearer {token}` format
- Verify `JWT_SECRET` is consistent

### CORS Issues

- Check `FRONTEND_URL` matches your frontend running URL
- Ensure credentials are allowed in CORS config

## 📚 Additional Resources

- [Neo4j Documentation](https://neo4j.com/docs/)
- [Express.js Guide](https://expressjs.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [Nodemailer Documentation](https://nodemailer.com/)

## 🚀 Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use strong, random `JWT_SECRET`
3. Enable HTTPS for all endpoints
4. Use environment variables for all sensitive data
5. Set up database backups
6. Configure rate limiting
7. Use a process manager like PM2

```bash
npm install -g pm2
pm2 start server.js --name kaliwebapp-backend
```

## 📝 License

This project is part of KaliWebApp. All rights reserved.

## 🤝 Support

For issues or questions, please contact: support@kaliwebapp.com
