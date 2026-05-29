import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Sparkles,
  Code2,
  Database,
  Wrench,
  GraduationCap,
  Award,
  Briefcase,
  FileText,
} from "lucide-react";
import portraitImg from "@/assets/henry-profile.jpeg";
import {
  loadPortfolio,
  type Portfolio,
  type Project,
  type Experience as ExperienceItem,
  type Education as EducationItem,
  type Certificate,
  type Profile,
  type Skills,
} from "@/lib/portfolio-store";
import { ThemeToggle } from "@/lib/theme";
import { imageAssets } from "@/lib/cert-assets";
import seed from "@/data/portfolio.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Henry Ugochukwu — Software Engineer & Full-Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Henry Ugochukwu — full-stack engineer building resilient, human-centered web products with React, Next.js, Node.js, and PostgreSQL.",
      },
      { property: "og:title", content: "Henry Ugochukwu — Software Engineer" },
      {
        property: "og:description",
        content: "Full-stack engineer. Founder of Henrymo Technologies. React · Next.js · Node.js · PostgreSQL.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

function Home() {
  const [data, setData] = useState<Portfolio>(seed as Portfolio);
  useEffect(() => setData(loadPortfolio()), []);

  const { profile, skills, projects, experience, education, certificates } = data;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Nav />
      <Hero profile={profile} />
      <MarqueeStrip />
      <About profile={profile} skills={skills} />
      <Projects projects={projects} />
      <Experience experience={experience} />
      <Education education={education} />
      <Certificates certificates={certificates} />
      <Contact profile={profile} />
      <Footer />
    </div>
  );
}

/* ───────── Nav ───────── */
function Nav() {
  const links = [
    { href: "#about", label: "About" },
    { href: "#work", label: "Work" },
    { href: "#experience", label: "Experience" },
    { href: "#certificates", label: "Certificates" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-hairline">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="size-2 rounded-full bg-primary shadow-glow group-hover:scale-125 transition-transform" />
          <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground">HU / Portfolio · 2026</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle variant="inline" />
          <Link
            to="/dashboard"
            className="font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border border-hairline hover:border-primary hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ───────── Hero ───────── */
function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-glow pointer-events-none" />
      <div className="absolute inset-0 grain opacity-60 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-28 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground border border-hairline rounded-full px-3 py-1.5"
          >
            <Sparkles className="size-3 text-primary" />
            Available for remote engineering roles
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95]"
          >
            Building software that feels{" "}
            <span className="italic text-primary">deliberate</span> —
            <br />
            for people, by an engineer.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-xl"
          >
            {profile.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full font-medium shadow-glow hover:scale-[1.02] transition-transform"
            >
              See selected work
              <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-hairline px-5 py-3 rounded-full hover:border-primary hover:text-primary transition-colors"
            >
              Get in touch
            </a>
          </motion.div>
          <div className="flex items-center gap-5 pt-6 text-muted-foreground text-sm">
            <span className="inline-flex items-center gap-2"><MapPin className="size-4" /> {profile.location}</span>
            <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-foreground"><Github className="size-4" /> GitHub</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-foreground"><Linkedin className="size-4" /> LinkedIn</a>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-elegant border border-hairline">
            <img src={portraitImg} alt={`${profile.name} portrait`} className="size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Currently</p>
                <p className="text-foreground font-medium">QA Engineer @ H10 AI · Founder @ Henrymo</p>
              </div>
              <span className="size-3 rounded-full bg-primary shadow-glow animate-pulse" />
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 hidden sm:block">
            <div className="bg-surface border border-hairline rounded-2xl px-4 py-3 shadow-elegant">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Years coding</p>
              <p className="font-display text-3xl">6+</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────── Marquee ───────── */
function MarqueeStrip() {
  const items = ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Azure", "Spring Boot", ".NET", "Tailwind", "Jest", "Playwright"];
  const row = [...items, ...items];
  return (
    <div className="border-y border-hairline bg-surface/40 overflow-hidden">
      <div className="flex gap-12 py-5 animate-[scroll_30s_linear_infinite] font-mono text-sm uppercase tracking-widest text-muted-foreground whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-12">
            {t}
            <span className="size-1.5 rounded-full bg-primary/60" />
          </span>
        ))}
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}

function SectionHead({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-6 mb-12">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">{kicker}</p>
        <h2 className="font-display text-4xl sm:text-5xl leading-tight max-w-2xl">{title}</h2>
      </div>
      {children}
    </div>
  );
}

/* ───────── About ───────── */
function About({ profile, skills }: { profile: Profile; skills: Skills }) {
  const groups = [
    { icon: Code2, label: "Engineering", items: skills.engineering },
    { icon: Database, label: "Data & APIs", items: skills.data },
    { icon: Wrench, label: "Craft", items: skills.craft },
  ];
  return (
    <section id="about" className="mx-auto max-w-7xl px-6 lg:px-10 py-28">
      <SectionHead kicker="01 · About" title="An engineer with a people-first operating system." />
      <div className="grid lg:grid-cols-12 gap-10">
        <p className="lg:col-span-7 text-lg text-muted-foreground leading-relaxed">{profile.summary}</p>
        <div className="lg:col-span-5 space-y-4">
          {groups.map(({ icon: Icon, label, items }) => (
            <div key={label} className="rounded-2xl border border-hairline bg-surface/60 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Icon className="size-4 text-primary" />
                <p className="font-mono text-xs uppercase tracking-widest">{label}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-surface-2 border border-hairline">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Projects ───────── */
function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="border-t border-hairline bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-28">
        <SectionHead kicker="02 · Selected Work" title="Shipped products, test pipelines, and platforms.">
          <Link to="/dashboard" className="hidden md:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">
            Manage <ArrowUpRight className="size-3" />
          </Link>
        </SectionHead>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => {
            const img = p.image ? imageAssets[p.image] : undefined;
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative rounded-3xl border border-hairline bg-background overflow-hidden hover:border-primary/60 transition-colors"
              >
                {img && (
                  <a
                    href={p.link || undefined}
                    target={p.link ? "_blank" : undefined}
                    rel="noreferrer"
                    className="block aspect-[16/9] overflow-hidden bg-surface-2 border-b border-hairline"
                  >
                    <img
                      src={img}
                      alt={`${p.title} preview`}
                      className="size-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
                    />
                  </a>
                )}
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{p.year} · {p.role}</p>
                      <h3 className="font-display text-2xl mt-1">{p.title}</h3>
                    </div>
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noreferrer" className="size-10 rounded-full border border-hairline flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors shrink-0">
                        <ArrowUpRight className="size-4" />
                      </a>
                    ) : (
                      <span className="size-10 rounded-full border border-hairline flex items-center justify-center text-muted-foreground shrink-0">
                        <Briefcase className="size-4" />
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-5">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="text-[11px] font-mono uppercase tracking-wider px-2 py-1 rounded-full bg-surface-2 border border-hairline">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────── Experience ───────── */
function Experience({ experience }: { experience: ExperienceItem[] }) {
  return (
    <section id="experience" className="mx-auto max-w-7xl px-6 lg:px-10 py-28">
      <SectionHead kicker="03 · Experience" title="Where I’ve shipped, taught, and led." />
      <ol className="relative border-l border-hairline ml-3 space-y-10">
        {experience.map((e) => (
          <li key={e.company + e.role} className="pl-8 relative">
            <span className="absolute -left-[7px] top-2 size-3 rounded-full bg-primary shadow-glow" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-2xl">{e.role}</h3>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{e.period}</p>
            </div>
            <p className="text-primary text-sm mb-3">{e.company} · {e.location}</p>
            <ul className="space-y-1.5 text-muted-foreground">
              {e.bullets.map((b) => (
                <li key={b} className="flex gap-3 leading-relaxed">
                  <span className="text-primary mt-2 size-1 rounded-full bg-primary shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ───────── Education ───────── */
function Education({ education }: { education: EducationItem[] }) {
  return (
    <section className="border-t border-hairline bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-28">
        <SectionHead kicker="04 · Education" title="Two degrees. One lens on technology and people." />
        <div className="grid md:grid-cols-3 gap-5">
          {education.map((ed) => (
            <div key={ed.degree} className="rounded-2xl border border-hairline bg-background p-6">
              <GraduationCap className="size-5 text-primary mb-4" />
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{ed.period}</p>
              <h3 className="font-display text-xl mt-1 mb-1">{ed.degree}</h3>
              <p className="text-sm">{ed.school}</p>
              <p className="text-sm text-muted-foreground mt-3">{ed.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Certificates ───────── */
function Certificates({ certificates }: { certificates: Certificate[] }) {
  const featured =
    certificates.find((c) => c.image === "byui-degree" && imageAssets[c.image]) ??
    certificates.find((c) => c.image && imageAssets[c.image]);
  return (
    <section id="certificates" className="mx-auto max-w-7xl px-6 lg:px-10 py-28">
      <SectionHead kicker="05 · Certificates" title="Conferred degrees and continuing study." />
      <div className="grid lg:grid-cols-3 gap-6">
        {featured && (
          <div className="lg:col-span-1 rounded-3xl border border-hairline bg-surface/60 p-3 overflow-hidden">
            <img src={imageAssets[featured.image!]} alt={featured.title} className="rounded-2xl w-full object-cover" />
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-3 px-2 pb-2">
              {featured.issuer} · {featured.date}
            </p>
          </div>
        )}
        <div className={`${featured ? "lg:col-span-2" : "lg:col-span-3"} grid sm:grid-cols-2 gap-3`}>
          {certificates.map((c) => (
            <div key={c.id} className="group rounded-2xl border border-hairline bg-background p-5 hover:border-primary/60 transition-colors">
              <div className="flex items-start gap-3">
                <span className="size-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <Award className="size-4 text-primary" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{c.date}</p>
                  <h4 className="font-medium leading-snug">{c.title}</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">{c.issuer}</p>
                  {c.file && (
                    <a href={c.file} target="_blank" rel="noreferrer" className="text-primary text-xs mt-2 inline-flex items-center gap-1 hover:underline">
                      <FileText className="size-3" /> View PDF <ArrowUpRight className="size-3" />
                    </a>
                  )}
                  {!c.file && c.image && imageAssets[c.image] && (
                    <a href={imageAssets[c.image]} target="_blank" rel="noreferrer" className="text-primary text-xs mt-2 inline-flex items-center gap-1 hover:underline">
                      View certificate <ArrowUpRight className="size-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Contact ───────── */
function Contact({ profile }: { profile: Profile }) {
  return (
    <section id="contact" className="relative border-t border-hairline overflow-hidden">
      <div className="absolute inset-0 bg-glow pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-32 relative">
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">06 · Let’s build</p>
        <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] max-w-4xl">
          Got a hard problem? <span className="italic">Bring it.</span>
        </h2>
        <p className="mt-6 text-muted-foreground text-lg max-w-2xl">
          I'm open to remote full-stack engineering roles, contract builds, and meaningful collaborations. The fastest way to reach me is email.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <ContactCard icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
          <ContactCard icon={Phone} label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, "")}`} />
          <ContactCard icon={Linkedin} label="LinkedIn" value="ugochukwuhenry" href={profile.linkedin} />
          <ContactCard icon={Github} label="GitHub" value="ugochukwu16henry" href={profile.github} />
        </div>
      </div>
    </section>
  );
}

function ContactCard({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group rounded-2xl border border-hairline bg-surface/60 p-5 hover:border-primary hover:bg-surface transition-colors block">
      <Icon className="size-4 text-primary mb-3" />
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm break-all group-hover:text-primary transition-colors">{value}</p>
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <p className="font-mono text-xs uppercase tracking-widest">© 2026 Henry Ugochukwu</p>
        <p className="font-mono text-xs uppercase tracking-widest">Built with intent · React · TanStack Start</p>
      </div>
    </footer>
  );
}
