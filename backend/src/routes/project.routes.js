import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { slugify } from '../utils/slugify.js';

export const projectRouter = Router();

projectRouter.get('/', async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Math.min(Number(req.query.pageSize) || 10, 50);
  const search = (req.query.search || '').toString().trim();

  const where = search
    ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { summary: { contains: search, mode: 'insensitive' } }
        ]
      }
    : {};

  const [items, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: [{ featured: 'desc' }, { displayOrder: 'asc' }, { createdAt: 'desc' }],
      skip: (page - 1) * pageSize,
      take: pageSize
    }),
    prisma.project.count({ where })
  ]);

  res.json({ items, total });
});
  projectRouter.get('/', async (req, res) => {
    const { page = 1, pageSize = 10, search = '' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const take = parseInt(pageSize);
    const where = search
      ? {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { summary: { contains: search, mode: 'insensitive' } }
        ]
      }
      : {};
    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy: [{ featured: 'desc' }, { displayOrder: 'asc' }, { createdAt: 'desc' }],
        skip,
        take
      }),
      prisma.project.count({ where })
    ]);
    res.json({ items: projects, total });
  });

projectRouter.get('/:idOrSlug', async (req, res) => {
  const { idOrSlug } = req.params;

  const project = await prisma.project.findFirst({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }]
    }
  });

  if (!project) {
    return res.status(404).json({ message: 'Project not found' });
  }

  return res.json(project);
});

projectRouter.post('/', requireAuth, async (req, res) => {
  const { id, slug: bodySlug, createdAt, updatedAt, ...payload } = req.body;
  const slug = bodySlug || slugify(payload.title);

  const project = await prisma.project.create({
    data: {
      ...payload,
      slug,
      techStack: payload.techStack || []
    }
  });

  res.status(201).json(project);
});

projectRouter.put('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  const { id: bodyId, slug: bodySlug, createdAt, updatedAt, ...payload } = req.body;

  const data = {
    ...payload,
    techStack: payload.techStack || []
  };

  // If title changed and no explicit slug provided, regenerate slug from title
  if (payload.title && !bodySlug) {
    data.slug = slugify(payload.title);
  } else if (bodySlug) {
    data.slug = bodySlug;
  }

  const project = await prisma.project.update({
    where: { id },
    data
  });

  res.json(project);
});

projectRouter.delete('/:id', requireAuth, async (req, res) => {
  const { id } = req.params;
  await prisma.project.delete({ where: { id } });
  res.status(204).send();
});
