import { initMongoConnection } from './db/initMongoConnection.js';
import { startServer } from './server.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    startServer();
  } catch (err) {
    console.error('Failed to start application:', err.message);
    process.exit(1);
  }
};

bootstrap();
