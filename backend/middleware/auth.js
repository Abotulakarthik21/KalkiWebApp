import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

export const generateVerificationToken = () => {
  return jwt.sign({ purpose: 'email-verification' }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.VERIFICATION_TOKEN_EXPIRY || 24}h`,
  });
};

export const generatePasswordResetToken = () => {
  return jwt.sign({ purpose: 'password-reset' }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};
