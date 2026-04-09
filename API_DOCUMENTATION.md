# KaliWebApp Backend API Documentation

## Overview

Complete REST API for KaliWebApp with authentication, user management, and Neo4j integration.

**Base URL**: `http://localhost:5000/api`

## Authentication

Authentication uses JWT (JSON Web Tokens). Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## Response Format

All responses are in JSON format with the following structure:

**Success:**

```json
{
  "message": "Success message",
  "user": {
    /* user object */
  },
  "token": "jwt-token"
}
```

**Error:**

```json
{
  "message": "Error message",
  "errors": [
    /* validation errors */
  ]
}
```

## Endpoints

### Authentication Endpoints

#### 1. Register User

Register a new user account.

**Endpoint**: `POST /auth/register`

**Request Body**:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response** (201):

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "john@example.com",
  "message": "User created successfully. Please check your email to verify your account."
}
```

**Error Response** (400/409):

```json
{
  "message": "Email already in use"
}
```

**Validation Rules**:

- firstName: Required, non-empty
- lastName: Required, non-empty
- email: Valid email format
- password: Minimum 6 characters

---

#### 2. Login User

Authenticate user and receive JWT token.

**Endpoint**: `POST /auth/login`

**Request Body**:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response** (200):

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses**:

- (401): Invalid credentials
- (403): Email not verified yet: "Please verify your email first"

---

#### 3. Verify Email

Verify user's email address using token from email link.

**Endpoint**: `GET /auth/verify-email/:token`

**URL Parameters**:

- `token` (string): Verification token from email

**Success Response** (200):

```json
{
  "message": "Email verified successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john@example.com",
    "firstName": "John"
  }
}
```

**Error Response** (400):

```json
{
  "message": "Invalid verification token or user not found"
}
```

---

#### 4. Request Password Reset

Send password reset link to user's email.

**Endpoint**: `POST /auth/forgot-password`

**Request Body**:

```json
{
  "email": "john@example.com"
}
```

**Success Response** (200):

```json
{
  "message": "If user exists, password reset link has been sent"
}
```

**Note**: Always returns same message for security (doesn't reveal if user exists)

---

#### 5. Reset Password

Reset user password with valid reset token.

**Endpoint**: `POST /auth/reset-password/:token`

**URL Parameters**:

- `token` (string): Password reset token from email

**Request Body**:

```json
{
  "password": "newpassword123"
}
```

**Success Response** (200):

```json
{
  "message": "Password reset successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "john@example.com",
    "firstName": "John"
  }
}
```

**Error Response** (400):

```json
{
  "message": "Invalid or expired reset token"
}
```

---

### User Endpoints

#### 6. Get Current User Profile

Retrieve authenticated user's profile. **Protected endpoint**.

**Endpoint**: `GET /users/profile`

**Headers**:

```
Authorization: Bearer <token>
```

**Success Response** (200):

```json
{
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "isVerified": true,
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response** (401):

```json
{
  "message": "Access token required"
}
```

---

#### 7. Update User Profile

Update authenticated user's profile. **Protected endpoint**.

**Endpoint**: `PUT /users/profile`

**Headers**:

```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body**:

```json
{
  "firstName": "Jane",
  "lastName": "Smith"
}
```

**Success Response** (200):

```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "john@example.com"
  }
}
```

---

#### 8. Get All Members

Get list of all registered members.

**Endpoint**: `GET /users/members`

**Query Parameters**: None

**Success Response** (200):

```json
{
  "count": 5,
  "members": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "isVerified": true
    },
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane@example.com",
      "isVerified": true
    }
  ]
}
```

---

### Utility Endpoints

#### 9. Health Check

Check if API server is running.

**Endpoint**: `GET /health`

**Success Response** (200):

```json
{
  "status": "Backend is running",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## Error Codes & Messages

| Code | Meaning      | Example                               |
| ---- | ------------ | ------------------------------------- |
| 400  | Bad Request  | Invalid input data, validation failed |
| 401  | Unauthorized | Missing or invalid token              |
| 403  | Forbidden    | Email not verified, token expired     |
| 404  | Not Found    | User not found                        |
| 409  | Conflict     | Email already exists                  |
| 500  | Server Error | Database error, email service error   |

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider adding:

```javascript
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use("/api/", limiter);
```

---

## Example Usage with cURL

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"John",
    "lastName":"Doe",
    "email":"john@example.com",
    "password":"password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@example.com",
    "password":"password123"
  }'
```

### Get Profile (Protected)

```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get Members

```bash
curl http://localhost:5000/api/users/members
```

---

## Best Practices

1. **Token Storage**: Store JWT in localStorage or sessionStorage
2. **Token Expiry**: Tokens expire after 7 days (configurable via JWT_EXPIRE)
3. **Password**: Always hash passwords (bcryptjs handles this)
4. **Email Verification**: Tokens expire after 24 hours
5. **Reset Tokens**: Password reset tokens expire after 1 hour
6. **HTTPS**: Use HTTPS in production
7. **CORS**: Update FRONTEND_URL for your domain

---

## Neo4j Database Schema

### User Node

```cypher
MATCH (u:User) RETURN u

// Properties:
{
  id: string (UUID),
  firstName: string,
  lastName: string,
  email: string (UNIQUE),
  password: string (hashed),
  isVerified: boolean,
  verificationToken: string,
  resetToken: string,
  resetTokenExpiry: datetime,
  createdAt: datetime,
  updatedAt: datetime
}
```

### Example Cypher Queries

```cypher
// Find user by email
MATCH (u:User {email: "john@example.com"}) RETURN u

// Get all verified users
MATCH (u:User {isVerified: true}) RETURN u ORDER BY u.createdAt DESC

// Count total users
MATCH (u:User) RETURN count(u) as totalUsers

// Find unverified users
MATCH (u:User {isVerified: false}) RETURN u
```

---

## Support & Troubleshooting

### Common Issues

**1. Email not sending**

- Verify Gmail App Password
- Check SMTP credentials in .env
- Ensure 2FA is enabled

**2. Cannot login after registration**

- Email must be verified first
- Check verification email link
- Token may have expired

**3. Token invalid error**

- Token may have expired
- Ensure token is passed in Authorization header
- Check JWT_SECRET in .env

**4. Database connection error**

- Ensure Neo4j is running
- Verify bolt URI and credentials
- Check firewall/network settings

---

## Version History

- **v1.0.0** (2024-01-15): Initial release with authentication and email verification

---

Last Updated: 2024-01-15
