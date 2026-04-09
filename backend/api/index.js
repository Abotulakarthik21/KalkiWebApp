import app from '../server.js';

// Initialize app on first request
let initialized = false;

// Import initialization functions
import { initializeNeo4j, createConstraints } from '../config/database.js';
import { initializeEmail } from '../config/emailService.js';

const initializeApp = async () => {
  if (!initialized) {
    try {
      console.log('🚀 Initializing Vercel serverless backend...');
      await initializeNeo4j();
      await createConstraints();
      initializeEmail();
      console.log('✅ Backend initialized successfully');
      initialized = true;
    } catch (error) {
      console.error('❌ Failed to initialize:', error.message);
      throw error;
    }
  }
};

// Middleware to initialize on first request
app.use(async (req, res, next) => {
  await initializeApp();
  next();
});

export default app;

