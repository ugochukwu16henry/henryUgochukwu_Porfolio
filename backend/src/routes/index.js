import { Router } from 'express';
import { authRouter } from './auth.routes.js';
import { profileRouter } from './profile.routes.js';
import { projectRouter } from './project.routes.js';
import { certificateRouter } from './certificate.routes.js';
import { mediaRouter } from './media.routes.js';
import { resumeRouter } from './resume.routes.js';
import { uploadRouter } from './upload.routes.js';

export const apiRouter = Router();

apiRouter.get('/health', (_, res) => {
  res.json({ status: 'ok', service: 'portfolio-api' });
});

apiRouter.use('/auth', authRouter);
apiRouter.use('/profile', profileRouter);
apiRouter.use('/projects', projectRouter);
apiRouter.use('/certificates', certificateRouter);
apiRouter.use('/media', mediaRouter);
apiRouter.use('/resumes', resumeRouter);
apiRouter.use('/upload', uploadRouter);
