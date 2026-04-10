import dotenv from 'dotenv';
import app, { ensureBackendServicesInitialized } from './app.js';
import { closeNeo4j } from './config/database.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log('Starting KaliWebApp Backend...');
    await ensureBackendServicesInitialized();

    if (process.env.NODE_ENV !== 'production') {
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Frontend URL: ${process.env.FRONTEND_URL}`);
        console.log(`Database: ${process.env.NEO4J_URI}`);
      });
    }

    process.on('SIGINT', async () => {
      console.log('\nShutting down server...');
      await closeNeo4j();
      process.exit(0);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

startServer().catch(err => {
  console.error('Critical error:', err.message);
  if (process.env.NODE_ENV !== 'production') {
    process.exit(1);
  }
});

export default app;
