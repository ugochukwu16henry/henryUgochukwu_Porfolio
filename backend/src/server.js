import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { apiRouter } from './routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000']
  })
);
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.resolve('uploads')));
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Portfolio API running on port ${port}`);
});
