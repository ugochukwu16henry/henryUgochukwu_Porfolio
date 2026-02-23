import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { requireAuth } from '../middleware/auth.js';

export const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email !== adminEmail) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  if (password !== adminPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ role: 'admin', email }, process.env.JWT_SECRET, {
    expiresIn: '8h'
  });

  return res.json({ token, user: { email, role: 'admin' } });
});

authRouter.get('/verify', requireAuth, (req, res) => {
  return res.json({ valid: true, user: req.user });
});
