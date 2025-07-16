import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import { UPLOAD_DIR } from './constants/index.js';
import contactsRouter from './routes/contactsRoutes.js';
import authRouter from './routes/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { getEnvVar } from './utils/getEnvVar.js';

import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
const swaggerDocument = JSON.parse(
  fs.readFileSync('./docs/swagger.json', 'utf8'),
);

const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.get('/', (req, res) => res.json({ message: 'Hello World!' }));

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use('/auth', authRouter);
  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
