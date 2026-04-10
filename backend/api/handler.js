import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { initializeNeo4j, createConstraints } from '../config/database.js';
import { initializeEmail } from '../config/emailService.js';
import authRoutes from '../routes/authRoutes.js';
import userRoutes from '../routes/userRoutes.js';

dotenv.config();

const app = express();

// Initialize Neo4j once
let neo4jInitialized = false;

// Middleware to ensure Neo4j is initialized
app.use(async (req, res, next) => {
  if (!neo4jInitialized) {
    try {
      await initializeNeo4j();
      await createConstraints();
      initializeEmail();
      console.log('✅ Backend initialized');
      neo4jInitialized = true;
    } catch (error) {
      console.error('❌ Init error:', error.message);
      return res.status(500).json({ message: 'Service unavailable' });
    }
  }
  next();
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Backend is running', timestamp: new Date().toISOString() });
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
});

export default app;
