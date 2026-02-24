import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { slugify } from '../utils/slugify.js';

export const projectRouter = Router();

projectRouter.get('/', async (_, res) => {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: 'desc' }, { displayOrder: 'asc' }, { createdAt: 'desc' }]
  });
  res.json(projects);
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
