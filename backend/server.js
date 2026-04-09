import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { closeNeo4j, createConstraints, initializeNeo4j } from './config/database.js';
import { initializeEmail } from './config/emailService.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Neo4j once
let neo4jInitialized = false;

// Middleware to ensure Neo4j is initialized before handling requests
app.use(async (req, res, next) => {
  if (!neo4jInitialized && process.env.NODE_ENV === 'production') {
    try {
      console.log('🚀 Initializing Neo4j for serverless...');
      await initializeNeo4j();
      await createConstraints();
      initializeEmail();
      console.log('✅ Neo4j connected successfully');
      console.log('✅ Database constraints and indexes created');
      console.log('✅ Email service initialized');
      neo4jInitialized = true;
    } catch (error) {
      console.error('❌ Failed to initialize:', error.message);
      return res.status(500).json({ message: 'Service unavailable' });
    }
  }
  next();
});

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
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

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
});

// Initialize and start server (local development only)
const startServer = async () => {
  try {
    if (!neo4jInitialized) {
      console.log('🚀 Starting KaliWebApp Backend...\n');
      await initializeNeo4j();
      await createConstraints();
      initializeEmail();
      console.log('✅ Email service initialized');
      neo4jInitialized = true;
    }

    app.listen(PORT, () => {
      console.log(`\n✨ Server is running on http://localhost:${PORT}`);
      console.log(`📧 Frontend URL: ${process.env.FRONTEND_URL}`);
      console.log(`🗄️  Database: ${process.env.NEO4J_URI}`);
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      console.log('\n\n🛑 Shutting down server...');
      await closeNeo4j();
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

// Only start locally
if (process.env.NODE_ENV !== 'production') {
  startServer();
}

// Export for Vercel
export default app;
