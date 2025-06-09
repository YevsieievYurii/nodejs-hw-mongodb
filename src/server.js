import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { getEnvVar } from './utils/getEnvVar.js';
import contactsRouter from './routes/contactsRoutes.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Routes
  app.use('/contacts', contactsRouter);

  // 404 Not Found Handler
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Global Error Handler
  app.use((err, req, res) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
