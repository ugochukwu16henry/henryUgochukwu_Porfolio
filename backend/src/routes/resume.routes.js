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
  resumeRouter.get('/', async (req, res) => {
    const { page = 1, pageSize = 10, search = '' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const take = parseInt(pageSize);
    const where = search
      ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } }
        ]
      }
      : {};
    const [items, total] = await Promise.all([
      prisma.resumeAsset.findMany({
        where,
        orderBy: [{ isPrimary: 'desc' }, { createdAt: 'desc' }],
        skip,
        take
      }),
      prisma.resumeAsset.count({ where })
    ]);
    res.json({ items, total });
  });

resumeRouter.post('/', requireAuth, async (req, res) => {
  const { id, createdAt, updatedAt, ...payload } = req.body;

  if (payload.isPrimary) {
    await prisma.resumeAsset.updateMany({ data: { isPrimary: false } });
  }

  const item = await prisma.resumeAsset.create({ data: payload });
  res.status(201).json(item);
});

resumeRouter.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { id: bodyId, createdAt, updatedAt, ...payload } = req.body;

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
