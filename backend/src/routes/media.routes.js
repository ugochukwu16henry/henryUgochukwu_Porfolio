import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

export const mediaRouter = Router();

mediaRouter.get('/', async (_, res) => {
  const assets = await prisma.mediaAsset.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(assets);
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
