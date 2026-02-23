import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

export const profileRouter = Router();

profileRouter.get('/', async (_, res) => {
  const profile = await prisma.profile.findFirst();
  res.json(profile);
});

profileRouter.put('/', requireAuth, async (req, res) => {
  const existing = await prisma.profile.findFirst();

  if (!existing) {
    const created = await prisma.profile.create({ data: req.body });
    return res.json(created);
  }

  const updated = await prisma.profile.update({
    where: { id: existing.id },
    data: req.body
  });

  return res.json(updated);
});
