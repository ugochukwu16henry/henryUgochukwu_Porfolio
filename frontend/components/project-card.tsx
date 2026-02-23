import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/lib/types';

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props) => {
  return (
    <article className="glass-card overflow-hidden">
      <div className="relative h-52 w-full">
        <Image src={project.imageUrl} alt={project.title} fill className="object-cover" />
      </div>
      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-xl font-semibold text-white">{project.title}</h3>
          <p className="mt-2 text-sm text-subtle">{project.summary}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.techStack.slice(0, 6).map((tech) => (
            <span key={tech} className="rounded-full border border-white/15 px-3 py-1 text-xs text-subtle">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="primary-btn">
            Live Project
          </a>
          {project.repoUrl ? (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="ghost-btn">
              GitHub Repo
            </a>
          ) : null}
          <Link href={`/projects/${project.slug}`} className="ghost-btn">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};
