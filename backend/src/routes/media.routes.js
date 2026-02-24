import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

export const mediaRouter = Router();

mediaRouter.get('/', async (_, res) => {
  const assets = await prisma.mediaAsset.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(assets);
});
  mediaRouter.get('/', async (req, res) => {
    const { page = 1, pageSize = 10, search = '' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const take = parseInt(pageSize);
    const where = search
      ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      }
      : {};
    const [assets, total] = await Promise.all([
      prisma.mediaAsset.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take
      }),
      prisma.mediaAsset.count({ where })
    ]);
    res.json({ items: assets, total });
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
