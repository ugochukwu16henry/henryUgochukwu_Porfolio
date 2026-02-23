import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

export const resumeRouter = Router();

resumeRouter.get('/', async (_, res) => {
  const items = await prisma.resumeAsset.findMany({
    orderBy: [{ isPrimary: 'desc' }, { createdAt: 'desc' }]
  });
  res.json(items);
});

resumeRouter.post('/', requireAuth, async (req, res) => {
  const payload = req.body;

  if (payload.isPrimary) {
    await prisma.resumeAsset.updateMany({ data: { isPrimary: false } });
  }

  const item = await prisma.resumeAsset.create({ data: payload });
  res.status(201).json(item);
});

resumeRouter.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  if (payload.isPrimary) {
    await prisma.resumeAsset.updateMany({
      where: { NOT: { id } },
      data: { isPrimary: false }
    });
  }

  const item = await prisma.resumeAsset.update({ where: { id }, data: payload });
  res.json(item);
});

resumeRouter.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  await prisma.resumeAsset.delete({ where: { id } });
  res.status(204).send();
});
