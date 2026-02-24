import Link from 'next/link';
import Image from 'next/image';
import { api } from '@/lib/api';
import { CertificateCard } from '@/components/certificate-card';
import { MediaGrid } from '@/components/media-grid';
import { ProjectCard } from '@/components/project-card';
import { SectionTitle } from '@/components/section-title';

export default async function HomePage() {
  const [profile, projectsPage, certificatesPage, mediaPage, resumesPage] = await Promise.all([
    api.getProfile().catch(() => null),
    api.getProjects().catch(() => ({ items: [], total: 0 })),
    api.getCertificates().catch(() => ({ items: [], total: 0 })),
    api.getMedia().catch(() => ({ items: [], total: 0 })),
    api.getResumes().catch(() => ({ items: [], total: 0 }))
  ]);

  const projects = projectsPage.items;
  const certificates = certificatesPage.items;
  const media = mediaPage.items;
  const resumes = resumesPage.items;

  const primaryResume = resumes.find((item) => item.isPrimary) || resumes[0];
  const primaryResumeUrl = primaryResume?.fileUrl || primaryResume?.linkUrl || '';

  return (
    <main className="space-y-20 pb-16">
      <section className="section-container pt-12 md:pt-20">
        <div className="glass-card grid items-center gap-10 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-10">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs uppercase tracking-wider text-accent">
              Open to Full Stack Opportunities
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
              {profile?.fullName || 'Henry M. Ugochukwu'}
            </h1>
            <p className="text-xl font-medium text-subtle">{profile?.title || 'Full Stack Developer'}</p>
            <p className="max-w-2xl text-subtle">{profile?.headline || 'Building modern, scalable products across frontend, backend, and cloud.'}</p>

            <div className="flex flex-wrap gap-3">
              <Link href="/admin" className="primary-btn">
                Admin Dashboard
              </Link>
              {primaryResumeUrl ? (
                <a href={primaryResumeUrl} target="_blank" rel="noreferrer" className="ghost-btn">
                  View Resume / CV
                </a>
              ) : null}
              {profile?.linkedInUrl ? (
                <a href={profile.linkedInUrl} target="_blank" rel="noreferrer" className="ghost-btn">
                  LinkedIn
                </a>
              ) : null}
            </div>
          </div>

          <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-3xl border border-white/15 md:h-80 md:w-80">
            <Image
              src={profile?.heroImageUrl || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200'}
              alt="Henry M. Ugochukwu"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="section-container">
        <SectionTitle eyebrow="About" title="Personal Brand & Story" description="A practical product engineer focused on user-centric, production-ready full stack systems." />
        <div className="glass-card space-y-4 p-6">
          <p className="text-subtle">{profile?.bio || 'I design and build complete products from clean UI to secure APIs, relational databases, and reliable cloud deployment.'}</p>
          <p className="text-sm text-subtle">First Degree: {profile?.firstDegree || 'B.Sc. Marriage and Family Studies (BYU-Idaho)'} — {profile?.firstDegreeDate || 'August 2025'}</p>
          <p className="text-sm text-subtle">Second Degree: {profile?.secondDegree || 'Software Development Engineering'} — {profile?.secondDegreeEta || 'Expected April 2026'}</p>
        </div>
      </section>

      <section className="section-container">
        <SectionTitle
          eyebrow="Projects"
          title="Featured Full Stack Projects"
          description="Each project includes live URL, repository, stack, and a detailed breakdown using the STAR method."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="section-container">
        <SectionTitle eyebrow="Skills" title="Technical Skills" description="Categorized stack built for modern product engineering and deployment-ready systems." />
        <div className="grid gap-4 md:grid-cols-4">
          <article className="glass-card p-4">
            <h3 className="font-semibold text-white">Frontend</h3>
            <p className="mt-2 text-sm text-subtle">Next.js, React, TypeScript, Tailwind CSS, Responsive UX</p>
          </article>
          <article className="glass-card p-4">
            <h3 className="font-semibold text-white">Backend</h3>
            <p className="mt-2 text-sm text-subtle">Node.js, Express, REST API Design, Authentication, CRUD Security</p>
          </article>
          <article className="glass-card p-4">
            <h3 className="font-semibold text-white">Database</h3>
            <p className="mt-2 text-sm text-subtle">PostgreSQL, Prisma ORM, Data Modeling, Query Optimization</p>
          </article>
          <article className="glass-card p-4">
            <h3 className="font-semibold text-white">DevOps</h3>
            <p className="mt-2 text-sm text-subtle">Vercel, Railway, CI/CD workflows, environment management</p>
          </article>
        </div>
      </section>

      <section className="section-container">
        <SectionTitle
          eyebrow="Services"
          title="What I Build for You"
          description="End-to-end solutions from clean UI to reliable databases, tailored for real-world products."
        />
        <div className="grid gap-4 md:grid-cols-4">
          <article className="glass-card p-4">
            <h3 className="font-semibold text-white">Web Development</h3>
            <p className="mt-2 text-sm text-subtle">
              Full-stack web applications built with modern frameworks, API integrations, auth, and deployment.
            </p>
          </article>
          <article className="glass-card p-4">
            <h3 className="font-semibold text-white">Web Design</h3>
            <p className="mt-2 text-sm text-subtle">
              Clean, responsive interfaces focused on usability, accessibility, and clear storytelling for your brand.
            </p>
          </article>
          <article className="glass-card p-4">
            <h3 className="font-semibold text-white">Dynamic Websites</h3>
            <p className="mt-2 text-sm text-subtle">
              Interactive dashboards, content-driven sites, and portals with real-time and personalized experiences.
            </p>
          </article>
          <article className="glass-card p-4">
            <h3 className="font-semibold text-white">Database Design</h3>
            <p className="mt-2 text-sm text-subtle">
              Relational schemas, data modeling, and performance-aware queries using PostgreSQL and Prisma.
            </p>
          </article>
        </div>
      </section>

      <section className="section-container">
        <SectionTitle eyebrow="Certificates" title="Training & Credentials" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((item) => (
            <CertificateCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="section-container">
        <SectionTitle eyebrow="Gallery" title="Profile & Graduation Photos" />
        <MediaGrid items={media} />
      </section>

      <section className="section-container">
        <SectionTitle eyebrow="Contact" title="Let’s Build Something Great" />
        <div className="glass-card flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-white">Email</p>
            <p className="text-subtle">{profile?.email || 'henry@example.com'}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {profile?.githubUrl ? (
              <a href={profile.githubUrl} className="ghost-btn" target="_blank" rel="noreferrer">
                GitHub
              </a>
            ) : null}
            {profile?.linkedInUrl ? (
              <a href={profile.linkedInUrl} className="ghost-btn" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
