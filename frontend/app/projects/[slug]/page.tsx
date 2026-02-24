import Link from 'next/link';
import Image from 'next/image';
import { api } from '@/lib/api';

const ensureAbsoluteUrl = (url: string) => {
  if (!url) return '#';
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
};

const normalizeImageUrl = (url: string) => {
  if (!url) return '';
  const railwayHost = 'henryugochukwuporfolio-production.up.railway.app';
  try {
    const parsed = new URL(url);
    if (parsed.hostname === railwayHost && parsed.protocol === 'http:') {
      parsed.protocol = 'https:';
      return parsed.toString();
    }
    return parsed.toString();
  } catch {
    return url;
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;
  const project = await api.getProject(slug);

  return (
    <main className="section-container py-10">
      <Link href="/" className="mb-6 inline-flex text-sm text-accent hover:underline">
        ← Back to Home
      </Link>

      <article className="glass-card overflow-hidden">
        <div className="relative h-72 w-full md:h-96">
          <Image src={normalizeImageUrl(project.imageUrl)} alt={project.title} fill className="object-cover" />
        </div>

        <div className="space-y-8 p-6 md:p-10">
          <header className="space-y-3">
            <h1 className="text-3xl font-bold text-white">{project.title}</h1>
            <p className="text-subtle">{project.summary}</p>
            <div className="flex flex-wrap gap-3">
              <a className="primary-btn" href={ensureAbsoluteUrl(project.liveUrl)} target="_blank" rel="noreferrer">
                Open Live Project
              </a>
              {project.repoUrl ? (
                <a className="ghost-btn" href={ensureAbsoluteUrl(project.repoUrl)} target="_blank" rel="noreferrer">
                  Open Repository
                </a>
              ) : null}
            </div>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Project Breakdown</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-muted/30 p-4">
                <h3 className="font-semibold text-white">Problem</h3>
                <p className="mt-2 text-sm text-subtle">{project.problem}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-muted/30 p-4">
                <h3 className="font-semibold text-white">Action</h3>
                <p className="mt-2 text-sm text-subtle">{project.actionTaken}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-muted/30 p-4">
                <h3 className="font-semibold text-white">Result</h3>
                <p className="mt-2 text-sm text-subtle">{project.result}</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Tech & Deployment</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="rounded-full border border-white/20 px-3 py-1 text-xs text-subtle">
                  {tech}
                </span>
              ))}
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <p className="rounded-lg border border-white/10 p-3 text-sm text-subtle">
                Frontend Hosting: <span className="font-medium text-white">{project.hostingFrontend || 'Vercel'}</span>
              </p>
              <p className="rounded-lg border border-white/10 p-3 text-sm text-subtle">
                Backend Hosting: <span className="font-medium text-white">{project.hostingBackend || 'Railway'}</span>
              </p>
              <p className="rounded-lg border border-white/10 p-3 text-sm text-subtle">
                DB Storage: <span className="font-medium text-white">{project.databaseStorage || 'PostgreSQL'}</span>
              </p>
            </div>
          </section>

          {project.galleryImages && project.galleryImages.length > 0 ? (
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Additional Screenshots</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {project.galleryImages.map((url) => (
                  <div key={url} className="relative h-56 w-full overflow-hidden rounded-xl border border-white/10">
                    <Image src={normalizeImageUrl(url)} alt={project.title} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
    </main>
  );
}
