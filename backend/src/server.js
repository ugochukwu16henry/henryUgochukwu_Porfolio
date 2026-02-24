import 'express-async-errors';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { apiRouter } from './routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const normalizeOrigin = (value = '') => value.trim().toLowerCase().replace(/\/+$/, '');

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map((origin) => normalizeOrigin(origin))
  .filter(Boolean);

const isOriginAllowed = (origin) => {
  const normalizedOrigin = normalizeOrigin(origin);

  if (allowedOrigins.includes('*') || allowedOrigins.includes(normalizedOrigin)) {
    return true;
  }

  return allowedOrigins.some((allowedOrigin) => {
    if (!allowedOrigin.startsWith('*.')) {
      return false;
    }

    const domain = allowedOrigin.slice(2);
    return normalizedOrigin.endsWith(`.${domain}`);
  });
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || isOriginAllowed(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    }
  })
);
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.resolve('uploads')));
app.use('/api', apiRouter);

app.use('/api/*', (_, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

app.use((error, _, res, __) => {
  const statusCode = error?.status || error?.statusCode || 500;
  const message = statusCode >= 500 ? 'Internal server error' : error.message;

  if (statusCode >= 500) {
    console.error('[API ERROR]', error);
  }

  res.status(statusCode).json({ message });
});

app.listen(port, () => {
  console.log(`Portfolio API running on port ${port}`);
});
