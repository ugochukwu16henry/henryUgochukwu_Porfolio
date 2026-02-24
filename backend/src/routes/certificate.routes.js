import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

export const certificateRouter = Router();

certificateRouter.get('/', async (_, res) => {
  const certificates = await prisma.certificate.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(certificates);
});

certificateRouter.post('/', requireAuth, async (req, res) => {
  const { id, createdAt, updatedAt, ...payload } = req.body;
  const certificate = await prisma.certificate.create({ data: payload });
  res.status(201).json(certificate);
});

certificateRouter.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { id: bodyId, createdAt, updatedAt, ...payload } = req.body;
  const certificate = await prisma.certificate.update({ where: { id }, data: payload });
  res.json(certificate);
});

certificateRouter.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  await prisma.certificate.delete({ where: { id } });
  res.status(204).send();
});
