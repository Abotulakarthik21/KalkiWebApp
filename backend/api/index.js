import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import { initializeNeo4j, createConstraints } from '../config/database.js';
import { initializeEmail } from '../config/emailService.js';
import authRoutes from '../routes/authRoutes.js';
import userRoutes from '../routes/userRoutes.js';

dotenv.config();

const app = express();

// CORS and JSON parsing
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database and services once
let initialized = false;
let initError = null;

const initializeServices = async () => {
  if (!initialized) {
    try {
      console.log('🚀 Initializing backend services...');
      await initializeNeo4j();
      await createConstraints();
      initializeEmail();
      initialized = true;
      console.log('✅ Services initialized');
    } catch (error) {
      console.error('❌ Init error:', error.message);
      initError = error;
      // Don't throw - continue with degraded service
    }
  }
};

// Start initialization in background (non-blocking)
initializeServices().catch(err => {
  console.error('Background init error:', err.message);
});

// Initialization middleware - non-blocking
app.use(async (req, res, next) => {
  // If not initialized yet, try to initialize (but don't wait)
  if (!initialized) {
    initializeServices().catch(err => {
      console.error('Request init error:', err.message);
    });
  }
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'KaliWebApp Backend API', version: '1.0.0' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found', path: req.path });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error'
  });
});

export default app;

