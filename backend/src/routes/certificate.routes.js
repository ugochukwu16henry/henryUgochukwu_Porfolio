import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

export const certificateRouter = Router();

certificateRouter.get('/', async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Math.min(Number(req.query.pageSize) || 10, 50);
  const search = (req.query.search || '').toString().trim();

  const where = search
    ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { issuer: { contains: search, mode: 'insensitive' } }
        ]
      }
    : {};

  const [items, total] = await Promise.all([
    prisma.certificate.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize
    }),
    prisma.certificate.count({ where })
  ]);

  res.json({ items, total });
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
