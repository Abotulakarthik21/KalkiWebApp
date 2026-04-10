import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createConstraints, initializeNeo4j } from './config/database.js';
import { initializeEmail } from './config/emailService.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

let backendInitialized = false;
let initializationPromise = null;

const corsOrigin = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map(origin => origin.trim()).filter(Boolean)
  : true;

export const ensureBackendServicesInitialized = async () => {
  if (backendInitialized) {
    return;
  }

  if (!initializationPromise) {
    initializationPromise = (async () => {
      await initializeNeo4j();
      await createConstraints();
      initializeEmail();
      backendInitialized = true;
      console.log('Backend services initialized');
    })().catch(error => {
      initializationPromise = null;
      throw error;
    });
  }

  await initializationPromise;
};

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get('/', (req, res) => {
  res.json({ message: 'KaliWebApp Backend API', version: '1.0.0' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Test endpoint works', timestamp: new Date().toISOString() });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'Backend is running',
    initialized: backendInitialized,
    timestamp: new Date().toISOString(),
  });
});

app.use(['/api/auth', '/api/users'], async (req, res, next) => {
  try {
    await ensureBackendServicesInitialized();
    next();
  } catch (error) {
    console.error('Failed to initialize backend services:', error.message);
    res.status(500).json({
      message: 'Service unavailable',
      ...(process.env.NODE_ENV === 'development' ? { error: error.message } : {}),
    });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found', path: req.path });
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
});

export default app;
