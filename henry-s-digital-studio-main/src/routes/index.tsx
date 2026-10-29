import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
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
  FileText,
  Lock,
  Rocket,
  ShieldCheck,
  HeartHandshake,
  Layers,
  Cloud,
  Bot,
  PenTool,
  Compass,
  LifeBuoy,
  CheckCircle2,
  Briefcase,
  PlayCircle,
} from "lucide-react";
import {
  loadPortfolio,
  mergeWithSeed,
  type Portfolio,
  type Project,
  type Experience as ExperienceItem,
  type Education as EducationItem,
  type Certificate,
  type Profile,
  type Skills,
} from "@/lib/portfolio-store";
import { getLivePortfolio } from "@/lib/api/portfolio.functions";
import { ThemeToggle } from "@/lib/theme";
import { portraitImage, resumePdf, resolvePortfolioImage, zentrixIcon } from "@/lib/cert-assets";
import { openStaticAsset } from "@/lib/open-static-asset";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import seed from "@/data/portfolio.json";
import { buildPortfolioHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => buildPortfolioHead({ path: "/", profile: seed.profile }),
  component: Home,
});

function Home() {
  const [data, setData] = useState<Portfolio>(seed as Portfolio);
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const live = await getLivePortfolio();
        if (!cancelled) {
          setData(mergeWithSeed(live.portfolio));
        }
      } catch {
        if (!cancelled) {
          setData(loadPortfolio());
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const { profile, skills, projects, experience, education, certificates } = data;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased overflow-x-clip">
      <ScrollProgress />
      <Nav profile={profile} />
      <Hero profile={profile} projects={projects} />
      <MarqueeStrip />
      <About profile={profile} skills={skills} />
      <Graduation certificates={certificates} />
      <Zentrix profile={profile} />
      <Projects projects={projects} />
      <Experience experience={experience} />
      <Education education={education} />
      <Certificates certificates={certificates} />
      <Contact profile={profile} />
      <Footer profile={profile} />
      <FloatingHire profile={profile} />
    </div>
  );
}

const resumeDownloadName = "Henry-Ugochukwu-Resume-May-2026.pdf";
const featuredDegreeId = "byui-bssd";

function hireHref(profile: Profile) {
  return `mailto:${profile.email}?subject=${encodeURIComponent("Let's work together")}`;
}

function companyUrl(profile: Profile) {
  return profile.companyUrl || "https://www.zentrixsoftware.org";
}

function ResumeLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <a
      href={resumePdf}
      download={resumeDownloadName}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const },
};

/* ───────── Scroll progress ───────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary"
      aria-hidden
    />
  );
}

/* ───────── Nav ───────── */
function Nav({ profile }: { profile: Profile }) {
  const links = [
    { href: "#about", label: "About" },
    { href: "#zentrix", label: "Zentrix" },
    { href: "#work", label: "Work" },
    { href: "#experience", label: "Experience" },
    { href: "#credentials", label: "Credentials" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/75 border-b border-hairline">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 group min-w-0">
          <img
            src="/favicon.svg"
            alt=""
            className="size-8 shrink-0 rounded-[0.6rem] shadow-glow group-hover:scale-105 transition-transform"
          />
          <span className="hidden sm:block truncate font-medium">{profile.name}</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle variant="inline" />
          <ResumeLink className="hidden sm:inline-flex font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border border-hairline hover:border-primary hover:text-primary transition-colors">
            Resume
          </ResumeLink>
          <Link
            to="/dashboard"
            className="hidden md:inline-flex font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border border-hairline hover:border-primary hover:text-primary transition-colors"
          >
            Dashboard
          </Link>
          <a
            href={hireHref(profile)}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow hover:scale-[1.03] transition-transform"
          >
            Hire me
          </a>
        </div>
      </div>
    </header>
  );
}

/* ───────── Hero ───────── */
function Hero({ profile, projects }: { profile: Profile; projects: Project[] }) {
  const live = projects.filter((p) => p.status === "Live").length;
  const stats = [
    { value: "6+", label: "Years building software" },
    { value: `${projects.length}`, label: "Products built" },
    { value: `${live}`, label: "Live in production" },
    { value: "2", label: "B.S. degrees" },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute inset-0 bg-glow pointer-events-none" />
      <div className="absolute inset-0 grain opacity-60 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-14 sm:pt-20 pb-20 sm:pb-28 grid lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-7 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-2"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
              <Rocket className="size-3.5" />
              6+ years shipping production software
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-hairline px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              Open to remote roles
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-[2.75rem] leading-[0.98] sm:text-6xl lg:text-7xl"
          >
            I turn hard problems into software people{" "}
            <span className="italic text-gradient">rely on.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            href={companyUrl(profile)}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-2xl border border-hairline bg-surface/70 py-2 pl-2 pr-4 hover:border-primary/60 transition-colors"
          >
            <img src={zentrixIcon} alt="" className="size-9 rounded-xl" />
            <span className="text-left leading-tight">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {profile.companyRole || "Co-Founder"}
              </span>
              <span className="block text-sm font-medium">
                {profile.company || "Zentrix Software Solutions"}
              </span>
            </span>
            <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href={hireHref(profile)}
              className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-full font-medium shadow-glow hover:scale-[1.02] transition-transform"
            >
              Let's work together
              <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 border border-hairline px-6 py-3.5 rounded-full hover:border-primary hover:text-primary transition-colors"
            >
              See my work
            </a>
            <ResumeLink className="inline-flex items-center gap-2 px-3 py-3.5 text-muted-foreground hover:text-primary transition-colors">
              <FileText className="size-4" />
              Resume
            </ResumeLink>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-background/90 px-4 py-4">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl sm:text-4xl">{s.value}</dd>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-5 relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-primary/20 blur-3xl" aria-hidden />
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-elegant border border-hairline">
            <img
              src={portraitImage}
              alt={`${profile.name} portrait`}
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="font-display text-3xl leading-none">{profile.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{profile.title}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="size-3.5" /> {profile.location}
              </p>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute -left-3 sm:-left-8 top-8 rounded-2xl border border-hairline bg-surface/95 px-4 py-3 shadow-elegant backdrop-blur"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary">
                <GraduationCap className="size-5" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-medium">B.S. Software Development</p>
                <p className="text-xs text-muted-foreground">BYU-Idaho</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="absolute -right-3 sm:-right-6 bottom-28 rounded-2xl border border-hairline bg-surface/95 px-4 py-3 shadow-elegant backdrop-blur"
          >
            <div className="flex items-center gap-3">
              <img src={zentrixIcon} alt="" className="size-9 rounded-xl" />
              <div className="leading-tight">
                <p className="text-sm font-medium">Co-Founder</p>
                <p className="text-xs text-muted-foreground">Zentrix Software</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────── Marquee ───────── */
function MarqueeStrip() {
  const items = [
    "React",
    "Next.js",
    "NestJS",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "Paystack",
    "AWS",
    "Docker",
    "Android",
    ".NET",
    "Spring Boot",
    "Playwright",
  ];
  const row = [...items, ...items];
  return (
    <div className="border-y border-hairline bg-surface/40 overflow-hidden" aria-hidden>
      <div className="flex w-max gap-12 py-5 animate-[marquee_40s_linear_infinite] font-mono text-sm uppercase tracking-widest text-muted-foreground whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="inline-flex items-center gap-12">
            {t}
            <span className="size-1.5 rounded-full bg-primary/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionHead({
  kicker,
  title,
  children,
  className = "",
}: {
  kicker: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      {...fadeUp}
      className={`flex flex-wrap items-end justify-between gap-6 mb-12 ${className}`}
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">{kicker}</p>
        <h2 className="font-display text-4xl sm:text-5xl leading-[1.05] max-w-3xl">{title}</h2>
      </div>
      {children}
    </motion.div>
  );
}

/* ───────── About ───────── */
function About({ profile, skills }: { profile: Profile; skills: Skills }) {
  const groups = [
    { icon: Code2, label: "Engineering", items: skills.engineering },
    { icon: Database, label: "Data, Cloud & Payments", items: skills.data },
    { icon: Wrench, label: "Craft", items: skills.craft },
  ];
  const promises = [
    {
      icon: Rocket,
      title: "Ownership, idea to launch",
      body: "Discovery, architecture, build, tests, deploy, and support — one accountable engineer.",
    },
    {
      icon: HeartHandshake,
      title: "People-first product sense",
      body: "A second degree in family studies means I design around how real people behave.",
    },
    {
      icon: ShieldCheck,
      title: "Ship fast, ship safe",
      body: "CI that blocks bad merges, real test suites, and payment flows handled with care.",
    },
  ];
  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-24 sm:py-28 scroll-mt-16"
    >
      <SectionHead
        kicker="01 · About"
        title={
          <>
            Six years of building, a company of my own —{" "}
            <span className="italic text-primary">and software that ships.</span>
          </>
        }
      />
      <div className="grid lg:grid-cols-12 gap-10">
        <motion.div {...fadeUp} className="lg:col-span-7 space-y-8">
          <p className="text-lg text-muted-foreground leading-relaxed">{profile.summary}</p>
          <div className="grid sm:grid-cols-3 gap-3">
            {promises.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="lift rounded-2xl border border-hairline bg-surface/60 p-5"
              >
                <Icon className="size-5 text-primary mb-3" />
                <p className="font-medium leading-snug">{title}</p>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div {...fadeUp} className="lg:col-span-5 space-y-4">
          {groups.map(({ icon: Icon, label, items }) => (
            <div key={label} className="rounded-2xl border border-hairline bg-surface/60 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Icon className="size-4 text-primary" />
                <p className="font-mono text-xs uppercase tracking-widest">{label}</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <span
                    key={s}
                    className="text-xs px-2.5 py-1 rounded-full bg-surface-2 border border-hairline"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ───────── Graduation spotlight ───────── */
function Graduation({ certificates }: { certificates: Certificate[] }) {
  const degree = certificates.find((c) => c.id === featuredDegreeId);
  const src = degree ? resolvePortfolioImage(degree.image) : undefined;
  if (!degree || !src) return null;
  const pdf = degree.file || src;

  return (
    <section className="relative border-t border-hairline bg-surface/30 overflow-hidden">
      <div className="absolute inset-0 bg-glow pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-24 sm:py-28 grid lg:grid-cols-12 gap-12 items-center">
        <motion.div {...fadeUp} className="lg:col-span-5 space-y-6">
          <p className="font-mono text-xs uppercase tracking-widest text-primary">
            02 · Credentials
          </p>
          <h2 className="font-display text-5xl sm:text-6xl leading-[0.98]">
            Real-world experience, <span className="italic text-gradient">formally certified.</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Years of shipping production software, backed by a{" "}
            <span className="text-foreground font-medium">
              Bachelor of Science in Software Development
            </span>{" "}
            from Brigham Young University–Idaho — one of two bachelor's degrees I hold. The products
            came first; the degree confirms the engineering behind them.
          </p>
          <ul className="space-y-2.5 text-sm">
            {[
              "Full-stack web, .NET, data structures, and web services",
              "Associate of Applied Science in Software Development",
              "Certificates in Web Development and Web & Computer Programming",
            ].map((t) => (
              <li key={t} className="flex gap-2.5 text-muted-foreground">
                <CheckCircle2 className="size-4 text-primary mt-0.5 shrink-0" /> {t}
              </li>
            ))}
          </ul>
          <a
            href={pdf}
            onClick={(e) => openStaticAsset(pdf, e)}
            className="inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 hover:border-primary hover:text-primary transition-colors"
          >
            <Award className="size-4" /> View degree certificate <ArrowUpRight className="size-4" />
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          whileHover={{ rotate: 0, scale: 1.01 }}
          className="lg:col-span-7"
        >
          <a
            href={src}
            onClick={(e) => openStaticAsset(src, e)}
            className="gold-frame block rounded-[1.4rem] p-[3px] shadow-elegant"
            aria-label={`Open ${degree.title} certificate`}
          >
            <div className="rounded-[1.25rem] bg-white p-2 sm:p-3">
              <img
                src={src}
                alt={`${degree.title} diploma — ${degree.issuer}`}
                className="w-full rounded-xl"
              />
            </div>
          </a>
          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {degree.title} · {degree.issuer} · {degree.date}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────── Zentrix ───────── */
function Zentrix({ profile }: { profile: Profile }) {
  const url = companyUrl(profile);
  const services = [
    { icon: Layers, title: "Custom Software", body: "Web, mobile, and platform builds" },
    { icon: Cloud, title: "Cloud, DevOps & SRE", body: "Pipelines, infra, uptime" },
    { icon: Bot, title: "AI & Automation", body: "LLM features and workflow automation" },
    { icon: PenTool, title: "Product Design", body: "UX that converts and retains" },
    { icon: Compass, title: "Technical Consulting", body: "Architecture and roadmap calls" },
    { icon: LifeBuoy, title: "Maintenance & Support", body: "Post-launch care that stays" },
  ];

  return (
    <section id="zentrix" className="relative scroll-mt-16 bg-[#07090c] text-white overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(50% 50% at 80% 10%, rgba(0,224,138,0.16) 0%, transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-24 sm:py-28">
        <motion.div {...fadeUp} className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <img src={zentrixIcon} alt="Zentrix logo" className="size-12 rounded-2xl" />
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#00e08a]">
                  03 · Co-Founder
                </p>
                <p className="text-sm text-white/60">
                  {profile.company || "Zentrix Software Solutions"}
                </p>
              </div>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl leading-[0.98]">
              Every software problem, <span className="italic text-[#00e08a]">solved.</span>
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              I co-founded Zentrix Software Solutions, a registered Nigerian engineering studio
              (CAMA 2020 · RC/BN 9648404). We design, build, and scale software that businesses and
              founders rely on — and we prove it with our own products, like Zentrix Market.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`${url.replace(/\/$/, "")}/contact`}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-[#00e08a] px-6 py-3.5 font-medium text-[#04110b] hover:brightness-110 transition"
              >
                Start a project with Zentrix
                <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 hover:border-[#00e08a] hover:text-[#00e08a] transition-colors"
              >
                zentrixsoftware.org <ArrowUpRight className="size-4" />
              </a>
            </div>
            <p className="text-xs text-white/50">Working across Africa, EU, and US time zones.</p>
          </div>
          <a href={url} target="_blank" rel="noreferrer" className="lg:col-span-6 block group">
            <BrowserFrame url="zentrixsoftware.org" dark>
              <img
                src={resolvePortfolioImage("zentrix-website")}
                alt="Zentrix Software Solutions website"
                className="w-full aspect-[16/10] object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
              />
            </BrowserFrame>
          </a>
        </motion.div>
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#00e08a]/50 hover:bg-white/[0.05] transition-colors"
            >
              <Icon className="size-5 text-[#00e08a] mb-3" />
              <p className="font-medium">{title}</p>
              <p className="mt-1 text-sm text-white/60">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Shared project visuals ───────── */
function BrowserFrame({
  url,
  dark,
  children,
}: {
  url: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border shadow-elegant ${
        dark ? "border-white/10 bg-[#0f1318]" : "border-hairline bg-surface"
      }`}
    >
      <div
        className={`flex items-center gap-2 px-4 py-2.5 border-b ${dark ? "border-white/10" : "border-hairline"}`}
      >
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span
          className={`ml-3 min-w-0 flex-1 truncate rounded-md px-3 py-1 font-mono text-[11px] ${
            dark ? "bg-white/5 text-white/50" : "bg-background text-muted-foreground"
          }`}
        >
          {url}
        </span>
      </div>
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

function hostOf(link?: string) {
  if (!link) return "";
  try {
    return new URL(link).host.replace(/^www\./, "");
  } catch {
    return link;
  }
}

function ProjectVisual({ project: p, className = "" }: { project: Project; className?: string }) {
  const img = resolvePortfolioImage(p.image);
  const label = hostOf(p.link) || (p.status ? `${p.status.toLowerCase()} · ${p.id}` : p.id);
  return (
    <BrowserFrame url={label}>
      {img ? (
        <img
          src={img}
          alt={`${p.title} screenshot`}
          loading="lazy"
          className={`w-full aspect-[16/10] object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] ${className}`}
        />
      ) : (
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/25 via-surface to-surface-2">
          <div className="absolute inset-0 bg-grid" />
          <div className="absolute -right-10 -bottom-10 size-48 rounded-full bg-primary/25 blur-3xl" />
          <div className="relative flex h-full flex-col justify-between p-6">
            <span className="w-fit rounded-full border border-hairline bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {p.role}
            </span>
            <div>
              <p className="font-display text-3xl sm:text-4xl leading-none">
                {p.title.split(/ [—–-] /)[0]}
              </p>
              <p className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-background/70 px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      )}
    </BrowserFrame>
  );
}

function StatusBadge({ status }: { status?: string }) {
  if (!status) return null;
  const live = status === "Live";
  const building = status === "In development" || status === "Prototype";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${
        live
          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
          : building
            ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
            : "bg-surface-2 text-muted-foreground"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${live ? "bg-emerald-500 animate-pulse" : building ? "bg-amber-500" : "bg-muted-foreground"}`}
      />
      {status}
    </span>
  );
}

function ProjectActions({ project: p, size = "md" }: { project: Project; size?: "md" | "lg" }) {
  const pad = size === "lg" ? "px-5 py-3" : "px-4 py-2.5";
  const outline = `inline-flex items-center gap-1.5 rounded-full border border-hairline ${pad} text-sm hover:border-primary hover:text-primary transition-colors`;
  return (
    <div className="flex flex-wrap gap-2">
      {p.link && (
        <a
          href={p.link}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-1.5 rounded-full bg-primary ${pad} text-sm font-medium text-primary-foreground hover:scale-[1.02] transition-transform`}
        >
          Visit live site <ArrowUpRight className="size-4" />
        </a>
      )}
      {p.github ? (
        <a href={p.github} target="_blank" rel="noreferrer" className={outline}>
          <Github className="size-4" /> Code
        </a>
      ) : (
        <span
          className={`${outline} cursor-default opacity-60 hover:border-hairline hover:text-current`}
        >
          <Lock className="size-3.5" /> Private repo
        </span>
      )}
      {p.videos?.length ? (
        <DemoVideos
          project={p}
          trigger={
            <button
              type="button"
              className={`${outline} border-primary/50 text-primary hover:bg-primary/10`}
            >
              <PlayCircle className="size-4" />
              {p.videos.length === 1 ? "Watch demo" : `Watch ${p.videos.length} demos`}
            </button>
          }
        />
      ) : null}
      <CaseStudy
        project={p}
        trigger={
          <button type="button" className={outline}>
            Case study
          </button>
        }
      />
    </div>
  );
}

function DemoVideos({
  project: p,
  trigger,
  initialIndex = 0,
}: {
  project: Project;
  trigger: React.ReactNode;
  initialIndex?: number;
}) {
  const videos = p.videos ?? [];
  const [active, setActive] = useState(initialIndex);
  const current = videos[active];
  if (!current) return null;
  const landscape = current.orientation === "landscape";

  return (
    <Dialog onOpenChange={(open) => open && setActive(initialIndex)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-normal sm:text-3xl">
            {p.title.split(/ [—–-] /)[0]} · Demo videos
          </DialogTitle>
          <DialogDescription>
            {active + 1} of {videos.length} · {current.title}
          </DialogDescription>
        </DialogHeader>
        <div className={`grid gap-5 ${videos.length > 1 ? "md:grid-cols-[1fr_17rem]" : ""}`}>
          <div className="flex min-w-0 items-center justify-center rounded-2xl bg-black">
            <video
              key={current.src}
              src={current.src}
              poster={current.poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className={
                landscape
                  ? "aspect-video w-full rounded-2xl"
                  : "max-h-[70vh] w-auto max-w-full rounded-2xl"
              }
            />
          </div>
          {videos.length > 1 && (
            <ol className="flex gap-2 overflow-x-auto pb-1 md:max-h-[70vh] md:flex-col md:overflow-y-auto md:overflow-x-visible md:pb-0 md:pr-1">
              {videos.map((v, i) => (
                <li key={v.src} className="shrink-0 md:shrink">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={i === active}
                    className={`flex w-40 items-center gap-3 rounded-xl border p-2 text-left transition-colors md:w-full ${
                      i === active
                        ? "border-primary bg-primary/10"
                        : "border-hairline hover:border-primary/50"
                    }`}
                  >
                    <span className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md bg-surface-2">
                      {v.poster && (
                        <img
                          src={v.poster}
                          alt=""
                          loading="lazy"
                          className="size-full object-cover"
                        />
                      )}
                      <PlayCircle className="absolute inset-0 m-auto size-5 text-white drop-shadow" />
                    </span>
                    <span className="line-clamp-2 text-xs leading-snug">{v.title}</span>
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DemoStrip({ project: p }: { project: Project }) {
  const videos = p.videos ?? [];
  if (!videos.length) return null;
  const shown = videos.slice(0, 5);
  return (
    <div>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-primary">
        {videos.length === 1 ? "Demo video" : `${videos.length} demo videos`}
      </p>
      <div className="flex gap-2">
        {shown.map((v, i) => (
          <DemoVideos
            key={v.src}
            project={p}
            initialIndex={i}
            trigger={
              <button
                type="button"
                aria-label={`Play ${v.title}`}
                className="group/v relative h-24 w-16 shrink-0 overflow-hidden rounded-xl border border-hairline bg-surface-2 hover:border-primary"
              >
                {v.poster && (
                  <img
                    src={v.poster}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover/v:scale-110"
                  />
                )}
                <span className="absolute inset-0 grid place-items-center bg-black/25 group-hover/v:bg-black/10">
                  <PlayCircle className="size-6 text-white drop-shadow" />
                </span>
              </button>
            }
          />
        ))}
        {videos.length > shown.length && (
          <DemoVideos
            project={p}
            initialIndex={shown.length}
            trigger={
              <button
                type="button"
                className="grid h-24 w-16 shrink-0 place-items-center rounded-xl border border-hairline text-sm text-muted-foreground hover:border-primary hover:text-primary"
              >
                +{videos.length - shown.length}
              </button>
            }
          />
        )}
      </div>
    </div>
  );
}

function CaseStudy({ project: p, trigger }: { project: Project; trigger: React.ReactNode }) {
  const rows = [
    { label: "The problem", value: p.problem },
    { label: "The challenge", value: p.challenge },
    { label: "The result", value: p.result },
  ].filter((r) => r.value);
  const img = resolvePortfolioImage(p.image);
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-2xl">
        {img && (
          <img
            src={img}
            alt=""
            className="w-full rounded-xl border border-hairline aspect-[16/9] object-cover object-top"
          />
        )}
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={p.status} />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {p.year}
            </span>
          </div>
          <DialogTitle className="font-display text-3xl font-normal">{p.title}</DialogTitle>
          <DialogDescription>{p.role}</DialogDescription>
        </DialogHeader>
        <dl className="space-y-5 text-sm">
          {rows.map((r) => (
            <div key={r.label}>
              <dt className="mb-1.5 font-mono text-[11px] uppercase tracking-widest text-primary">
                {r.label}
              </dt>
              <dd className="leading-relaxed text-muted-foreground">{r.value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span key={s} className="rounded-full border border-hairline px-2.5 py-1 text-xs">
              {s}
            </span>
          ))}
        </div>
        {p.link && (
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Visit {hostOf(p.link)} <ArrowUpRight className="size-4" />
          </a>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ───────── Projects ───────── */
function Projects({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const filters = useMemo(() => {
    const statuses = Array.from(new Set(rest.map((p) => p.status).filter(Boolean))) as string[];
    return ["All", ...statuses];
  }, [rest]);
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? rest : rest.filter((p) => p.status === filter);

  return (
    <section
      id="work"
      className="scroll-mt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-24 sm:py-28"
    >
      <SectionHead
        kicker="04 · Selected work"
        title={
          <>
            Real products. Real users. <span className="italic text-primary">Shipped.</span>
          </>
        }
      >
        <p className="max-w-sm text-muted-foreground">
          Marketplaces, fintech, school SaaS, and e-commerce — each with a live link or code, the
          stack, and a full case study.
        </p>
      </SectionHead>

      <div className="space-y-20 sm:space-y-24">
        {featured.map((p, i) => (
          <motion.article
            key={p.id}
            {...fadeUp}
            className="group grid min-w-0 lg:grid-cols-12 gap-8 lg:gap-12 items-center [&>*]:min-w-0"
          >
            <a
              href={p.link || undefined}
              target="_blank"
              rel="noreferrer"
              className={`lg:col-span-7 block ${i % 2 === 1 ? "lg:order-2" : ""}`}
              aria-label={`${p.title} live site`}
            >
              <ProjectVisual project={p} />
            </a>
            <div className={`lg:col-span-5 space-y-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <StatusBadge status={p.status} />
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {p.role} · {p.year}
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl leading-tight">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{p.description}</p>
              {p.result && (
                <p className="rounded-2xl border border-hairline bg-surface/60 p-4 text-sm leading-relaxed">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary block mb-1">
                    Outcome
                  </span>
                  {p.result}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-full border border-hairline px-2.5 py-1 text-xs">
                    {s}
                  </span>
                ))}
              </div>
              <DemoStrip project={p} />
              <ProjectActions project={p} size="lg" />
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-24 sm:mt-28">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <h3 className="font-display text-3xl">More products I've built</h3>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                  filter === f
                    ? "bg-foreground text-background"
                    : "border border-hairline text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
      className="group lift flex min-w-0 flex-col rounded-3xl border border-hairline bg-surface/50 p-3"
    >
      <ProjectVisual project={p} />
      <div className="flex flex-1 flex-col gap-3 px-2 pb-2 pt-5">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={p.status} />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {p.year}
          </span>
        </div>
        <h4 className="text-lg font-semibold leading-snug">{p.title}</h4>
        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {p.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {p.stack.slice(0, 4).map((s) => (
            <span key={s} className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[11px]">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-auto pt-2">
          <ProjectActions project={p} />
        </div>
      </div>
    </motion.article>
  );
}

/* ───────── Experience ───────── */
function Experience({ experience }: { experience: ExperienceItem[] }) {
  return (
    <section id="experience" className="scroll-mt-16 border-t border-hairline bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-24 sm:py-28 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHead
              kicker="05 · Experience"
              title="Where I've shipped, tested, and led."
              className="mb-6"
            />
            <p className="text-muted-foreground">
              From co-founding a software studio to hardening releases at an AI company — I've
              worked on both sides of the product.
            </p>
          </div>
        </div>
        <ol className="lg:col-span-8 relative border-l border-hairline ml-3 space-y-8">
          {experience.map((e, i) => (
            <motion.li
              key={e.company + e.role}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="pl-8 relative"
            >
              <span
                className={`absolute -left-[7px] top-6 size-3 rounded-full ${i === 0 ? "bg-primary shadow-glow" : "bg-muted-foreground/60"}`}
              />
              <div className="lift rounded-2xl border border-hairline bg-background p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl">{e.role}</h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {e.period}
                  </p>
                </div>
                <p className="text-primary text-sm mb-4 inline-flex items-center gap-1.5">
                  <Briefcase className="size-3.5" /> {e.company} · {e.location}
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-3 leading-relaxed">
                      <span className="mt-2.5 size-1 rounded-full bg-primary shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────── Education ───────── */
function Education({ education }: { education: EducationItem[] }) {
  return (
    <section
      id="credentials"
      className="scroll-mt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28"
    >
      <SectionHead
        kicker="06 · Education"
        title="Two degrees. One lens on technology and people."
      />
      <div className="grid md:grid-cols-3 gap-5">
        {education.map((ed, i) => (
          <motion.div
            key={ed.degree}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className={`lift rounded-2xl border p-6 ${i === 0 ? "border-primary/50 bg-primary/5" : "border-hairline bg-surface/40"}`}
          >
            <div className="flex items-center justify-between mb-4">
              <GraduationCap className="size-5 text-primary" />
              {i === 0 && (
                <span className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-primary-foreground">
                  Latest
                </span>
              )}
            </div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {ed.period}
            </p>
            <h3 className="font-display text-2xl mt-1 mb-1">{ed.degree}</h3>
            <p className="text-sm">{ed.school}</p>
            <p className="text-sm text-muted-foreground mt-3">{ed.note}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────── Certificates ───────── */
function certImageSrc(certificate: Certificate): string | undefined {
  return resolvePortfolioImage(certificate.image);
}

function Certificates({ certificates }: { certificates: Certificate[] }) {
  return (
    <section id="certificates" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-20 sm:py-24">
      <motion.div {...fadeUp} className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <h3 className="font-display text-3xl">Degrees & certificates</h3>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {certificates.length} credentials · tap to view
        </p>
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.map((c, i) => {
          const src = certImageSrc(c);
          const open = c.file || src;
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.05 }}
              className="group lift rounded-2xl border border-hairline bg-background overflow-hidden hover:border-primary/60"
            >
              {src && (
                <a
                  href={src}
                  onClick={(e) => openStaticAsset(src, e)}
                  className="block cursor-pointer border-b border-hairline bg-surface-2 overflow-hidden"
                >
                  <img
                    src={src}
                    alt={c.title}
                    loading="lazy"
                    className="w-full aspect-[16/10] object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </a>
              )}
              <div className="p-5 flex items-start gap-3">
                {!src && (
                  <span className="size-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                    <Award className="size-4 text-primary" />
                  </span>
                )}
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {c.date}
                  </p>
                  <h4 className="font-medium leading-snug">{c.title}</h4>
                  <p className="text-sm text-muted-foreground mt-0.5">{c.issuer}</p>
                  {open && (
                    <a
                      href={open}
                      onClick={(e) => openStaticAsset(open, e)}
                      className="text-primary text-xs mt-2 inline-flex items-center gap-1 hover:underline"
                    >
                      <FileText className="size-3" /> {c.file ? "View PDF" : "View certificate"}{" "}
                      <ArrowUpRight className="size-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ───────── Contact ───────── */
function Contact({ profile }: { profile: Profile }) {
  return (
    <section
      id="contact"
      className="relative scroll-mt-16 border-t border-hairline overflow-hidden"
    >
      <div className="absolute inset-0 bg-glow pointer-events-none" />
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-24 sm:py-32 relative">
        <motion.div {...fadeUp}>
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
            07 · Let's build
          </p>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] max-w-4xl">
            Got a hard problem? <span className="italic text-gradient">Bring it.</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-2xl">
            Tell me what you're building — I'll tell you honestly how I'd approach it, and what it
            would take.
          </p>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-2 gap-4">
          <motion.a
            {...fadeUp}
            href={hireHref(profile)}
            className="group lift relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground"
          >
            <Sparkles className="size-6 mb-8" />
            <p className="font-mono text-xs uppercase tracking-widest opacity-80">
              Hiring an engineer?
            </p>
            <p className="mt-2 font-display text-3xl sm:text-4xl leading-tight">
              Remote roles & contract builds
            </p>
            <p className="mt-3 max-w-md opacity-85">
              Full-stack, QA, or product engineering — I can contribute from day one.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 font-medium">
              Email me{" "}
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.a>
          <motion.a
            {...fadeUp}
            href={`${companyUrl(profile).replace(/\/$/, "")}/contact`}
            target="_blank"
            rel="noreferrer"
            className="group lift relative overflow-hidden rounded-3xl bg-[#07090c] p-8 text-white"
          >
            <img src={zentrixIcon} alt="" className="size-10 rounded-xl mb-6" />
            <p className="font-mono text-xs uppercase tracking-widest text-[#00e08a]">
              Need a product built?
            </p>
            <p className="mt-2 font-display text-3xl sm:text-4xl leading-tight">
              Hire my team at Zentrix
            </p>
            <p className="mt-3 max-w-md text-white/70">
              Web, mobile, cloud, and AI — scoped, priced, and delivered end to end.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 font-medium text-[#00e08a]">
              Start a project{" "}
              <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </motion.a>
        </div>

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <ContactCard
            icon={Mail}
            label="Email"
            value={profile.email}
            href={`mailto:${profile.email}`}
          />
          <ContactCard
            icon={Phone}
            label="Phone"
            value={profile.phone}
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
          />
          <ContactCard
            icon={Linkedin}
            label="LinkedIn"
            value="ugochukwuhenry"
            href={profile.linkedin}
          />
          <ContactCard
            icon={Github}
            label="GitHub"
            value="ugochukwu16henry"
            href={profile.github}
          />
          <ContactCard
            icon={FileText}
            label="Resume"
            value="Download PDF"
            href={resumePdf}
            download={resumeDownloadName}
          />
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  download,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
  download?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      download={download}
      className="group rounded-2xl border border-hairline bg-surface/60 p-5 hover:border-primary hover:bg-surface transition-colors block"
    >
      <Icon className="size-4 text-primary mb-3" />
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm break-all group-hover:text-primary transition-colors">{value}</p>
    </a>
  );
}

function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <p className="font-mono text-xs uppercase tracking-widest">© 2026 {profile.name}</p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={companyUrl(profile)}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs uppercase tracking-widest hover:text-primary transition-colors"
          >
            Co-Founder · Zentrix
          </a>
          <ResumeLink className="font-mono text-xs uppercase tracking-widest hover:text-primary transition-colors">
            Download resume
          </ResumeLink>
        </div>
      </div>
    </footer>
  );
}

/* ───────── Floating CTA (appears after the hero) ───────── */
function FloatingHire({ profile }: { profile: Profile }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.a
      href={hireHref(profile)}
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 16, pointerEvents: show ? "auto" : "none" }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-20 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow"
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
    >
      <Mail className="size-4" /> Work with me
    </motion.a>
  );
}
