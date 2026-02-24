import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../utils/upload.js';

export const uploadRouter = Router();

uploadRouter.post('/', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const forwardedProto = req.headers['x-forwarded-proto'];
  const protocolHeader = Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto;
  const protocol =
    protocolHeader ||
    (process.env.NODE_ENV === 'production' ? 'https' : req.protocol || 'http');

  const baseUrl = `${protocol}://${req.get('host')}`;
  const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

  return res.status(201).json({
    fileName: req.file.originalname,
    fileUrl
  });
});
