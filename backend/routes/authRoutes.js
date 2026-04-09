import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import { userService } from '../services/userService.js';

const router = express.Router();

// Validation middleware
const validateEmail = body('email').isEmail().normalizeEmail();
const validatePassword = body('password').isLength({ min: 6 });
const validateFirstName = body('firstName').trim().notEmpty();
const validateLastName = body('lastName').trim().notEmpty();

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Register
router.post(
  '/register',
  [validateEmail, validatePassword, validateFirstName, validateLastName],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;

      // Check if user already exists
      const existingUser = await userService.findUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: 'Email already in use' });
      }

      const result = await userService.createUser({
        firstName,
        lastName,
        email,
        password,
      });

      res.status(201).json(result);
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Registration failed', error: error.message });
    }
  }
);

// Login
router.post(
  '/login',
  [validateEmail, validatePassword],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const result = await userService.loginUser(email, password);

      res.status(200).json({
        message: 'Login successful',
        token: result.token,
        user: result.user,
      });
    } catch (error) {
      console.error('Login error:', error);

      if (error.message.includes('verify your email')) {
        res.status(403).json({ message: error.message });
      } else {
        res.status(401).json({ message: error.message || 'Login failed' });
      }
    }
  }
);

// Verify Email
router.get('/verify-email/:token', async (req, res) => {
  try {
    const { token } = req.params;

    const user = await userService.verifyEmail(token);

    res.status(200).json({
      message: 'Email verified successfully',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
      },
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(400).json({ message: error.message || 'Email verification failed' });
  }
});

// Request Password Reset
router.post(
  '/forgot-password',
  [validateEmail],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { email } = req.body;

      const result = await userService.requestPasswordReset(email);

      res.status(200).json(result);
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ message: 'Request failed', error: error.message });
    }
  }
);

// Reset Password
router.post(
  '/reset-password/:token',
  [body('password').isLength({ min: 6 })],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      const user = await userService.resetPassword(token, password);

      res.status(200).json({
        message: 'Password reset successfully',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
        },
      });
    } catch (error) {
      console.error('Password reset error:', error);
      res.status(400).json({ message: error.message || 'Password reset failed' });
    }
  }
);

// Get Current User Profile (Protected)
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await userService.getUserWithDetails(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Failed to get profile', error: error.message });
  }
});

// Update User Profile (Protected)
router.put(
  '/profile',
  authenticateToken,
  [validateFirstName, validateLastName],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { firstName, lastName } = req.body;

      const user = await userService.updateUserProfile(req.userId, {
        firstName,
        lastName,
      });

      res.status(200).json({
        message: 'Profile updated successfully',
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ message: 'Failed to update profile', error: error.message });
    }
  }
);

export default router;
