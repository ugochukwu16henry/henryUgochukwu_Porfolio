import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

export const mediaRouter = Router();

mediaRouter.get('/', async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Math.min(Number(req.query.pageSize) || 10, 50);
  const search = (req.query.search || '').toString().trim();

  const where = search
    ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      }
    : {};

  const [items, total] = await Promise.all([
    prisma.mediaAsset.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize
    }),
    prisma.mediaAsset.count({ where })
  ]);

  res.json({ items, total });
});

mediaRouter.post('/', requireAuth, async (req, res) => {
  const { id, createdAt, updatedAt, ...payload } = req.body;
  const asset = await prisma.mediaAsset.create({ data: payload });
  res.status(201).json(asset);
});

mediaRouter.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { id: bodyId, createdAt, updatedAt, ...payload } = req.body;
  const asset = await prisma.mediaAsset.update({ where: { id }, data: payload });
  res.json(asset);
});

mediaRouter.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  await prisma.mediaAsset.delete({ where: { id } });
  res.status(204).send();
});
