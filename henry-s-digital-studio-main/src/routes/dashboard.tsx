import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus, Trash2, Save, RotateCcw, Download, Lock, ArrowLeft } from "lucide-react";
import { toast, Toaster } from "sonner";
import { ThemeToggle, useTheme } from "@/lib/theme";
import {
  loadPortfolio,
  mergeWithSeed,
  savePortfolio,
  resetStore,
  exportJson,
  type Portfolio,
  type Project,
  type Experience,
  type Education,
  type Certificate,
} from "@/lib/portfolio-store";
import { getLivePortfolio, saveLivePortfolio } from "@/lib/api/portfolio.functions";
import seed from "@/data/portfolio.json";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · Henry Ugochukwu" },
      { name: "description", content: "Manage portfolio content." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: Dashboard,
});

const PASS_KEY = "henry-dash:auth";
const PASSCODE = "henry2026";

const normalizePasscode = (value: string) => value.trim();

type Tab = "profile" | "skills" | "projects" | "experience" | "education" | "certificates";

function Dashboard() {
  const { theme } = useTheme();
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<Portfolio>(seed as Portfolio);
  const [tab, setTab] = useState<Tab>("projects");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setAuthed(localStorage.getItem(PASS_KEY) === "1");

    const load = async () => {
      try {
        const live = await getLivePortfolio();
        if (!cancelled) {
          const merged = mergeWithSeed(live.portfolio);
          setData(merged);
          savePortfolio(merged);
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

  const patch = <K extends keyof Portfolio>(key: K, value: Portfolio[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setDirty(true);
  };

  const save = async () => {
    try {
      const result = await saveLivePortfolio({ data });
      savePortfolio(data);
      setDirty(false);
      toast.success(`Saved to GitHub${result.commitSha ? ` (${result.commitSha.slice(0, 7)})` : ""}.`);
    } catch (error) {
      console.error(error);
      savePortfolio(data);
      setDirty(false);
      toast.error("GitHub save failed. Saved locally only.");
    }
  };

  const reset = () => {
    resetStore();
    setData(loadPortfolio());
    setDirty(false);
    toast.message("Reset to seed JSON.");
  };

  const download = () => {
    savePortfolio(data);
    const blob = new Blob([exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!authed) return <Gate onPass={() => setAuthed(true)} />;

  const tabs: { id: Tab; label: string }[] = [
    { id: "profile", label: "Profile" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "certificates", label: "Certificates" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster theme={theme} position="top-right" richColors />
      <header className="border-b border-hairline sticky top-0 bg-background/80 backdrop-blur z-40">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" /> Back to site
          </Link>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Portfolio · Dashboard {dirty && <span className="text-primary">· unsaved</span>}
          </p>
          <div className="flex items-center gap-2">
            <ThemeToggle variant="inline" />
            <button
              onClick={() => { localStorage.removeItem(PASS_KEY); setAuthed(false); }}
              className="text-xs text-muted-foreground hover:text-primary"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl leading-tight">Manage portfolio</h1>
            <p className="text-muted-foreground mt-2 text-sm">Edits live in your browser. Click <strong>Export JSON</strong> to download the file to commit.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={save} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium hover:scale-[1.02] transition-transform">
              <Save className="size-4" /> Save
            </button>
            <button onClick={download} className="inline-flex items-center gap-2 border border-hairline px-4 py-2 rounded-full hover:border-primary hover:text-primary">
              <Download className="size-4" /> Export JSON
            </button>
            <button onClick={reset} className="inline-flex items-center gap-2 border border-hairline px-4 py-2 rounded-full hover:border-destructive hover:text-destructive">
              <RotateCcw className="size-4" /> Reset
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 border-b border-hairline">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-sm font-mono uppercase tracking-widest border-b-2 -mb-px transition-colors ${
                tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "profile" && (
          <ProfileEditor profile={data.profile} onChange={(p) => patch("profile", p)} />
        )}
        {tab === "skills" && (
          <SkillsEditor skills={data.skills} onChange={(s) => patch("skills", s)} />
        )}
        {tab === "projects" && (
          <ProjectsEditor projects={data.projects} onChange={(p) => patch("projects", p)} />
        )}
        {tab === "experience" && (
          <ExperienceEditor experience={data.experience} onChange={(e) => patch("experience", e)} />
        )}
        {tab === "education" && (
          <EducationEditor education={data.education} onChange={(e) => patch("education", e)} />
        )}
        {tab === "certificates" && (
          <CertificatesEditor certificates={data.certificates} onChange={(c) => patch("certificates", c)} />
        )}
      </main>
    </div>
  );
}

/* ───────── Editors ───────── */

function ProfileEditor({ profile, onChange }: { profile: Portfolio["profile"]; onChange: (p: Portfolio["profile"]) => void }) {
  const set = (k: keyof Portfolio["profile"], v: string) => onChange({ ...profile, [k]: v });
  return (
    <Panel>
      <div className="grid md:grid-cols-2 gap-3">
        <Field label="Name" value={profile.name} onChange={(v) => set("name", v)} />
        <Field label="Full name" value={profile.fullName} onChange={(v) => set("fullName", v)} />
        <Field label="Title" value={profile.title} onChange={(v) => set("title", v)} />
        <Field label="Location" value={profile.location} onChange={(v) => set("location", v)} />
        <Field label="Email" value={profile.email} onChange={(v) => set("email", v)} />
        <Field label="Phone" value={profile.phone} onChange={(v) => set("phone", v)} />
        <Field label="LinkedIn URL" value={profile.linkedin} onChange={(v) => set("linkedin", v)} className="md:col-span-2" />
        <Field label="GitHub URL" value={profile.github} onChange={(v) => set("github", v)} className="md:col-span-2" />
        <TextArea label="Tagline" value={profile.tagline} onChange={(v) => set("tagline", v)} className="md:col-span-2" rows={2} />
        <TextArea label="Summary" value={profile.summary} onChange={(v) => set("summary", v)} className="md:col-span-2" rows={5} />
      </div>
    </Panel>
  );
}

function SkillsEditor({ skills, onChange }: { skills: Portfolio["skills"]; onChange: (s: Portfolio["skills"]) => void }) {
  const set = (k: keyof Portfolio["skills"], v: string) =>
    onChange({ ...skills, [k]: v.split(",").map((x) => x.trim()).filter(Boolean) });
  return (
    <Panel>
      <div className="space-y-3">
        <Field label="Engineering (comma separated)" value={skills.engineering.join(", ")} onChange={(v) => set("engineering", v)} />
        <Field label="Data & APIs (comma separated)" value={skills.data.join(", ")} onChange={(v) => set("data", v)} />
        <Field label="Craft (comma separated)" value={skills.craft.join(", ")} onChange={(v) => set("craft", v)} />
      </div>
    </Panel>
  );
}

function ProjectsEditor({ projects, onChange }: { projects: Project[]; onChange: (p: Project[]) => void }) {
  const update = (id: string, patch: Partial<Project>) =>
    onChange(projects.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const add = () =>
    onChange([
      {
        id: `proj-${Date.now()}`,
        title: "New Project",
        year: String(new Date().getFullYear()),
        role: "Lead Developer",
        stack: ["React"],
        description: "One-line summary for the card header.",
        problem: "What problem does this solve?",
        challenge: "What was hard — technically or architecturally?",
        result: "What shipped and what impact did it have?",
        image: "",
        link: "",
        github: "",
      },
      ...projects,
    ]);
  const remove = (id: string) => onChange(projects.filter((x) => x.id !== id));

  return (
    <div className="space-y-4">
      <AddBar onAdd={add} label="Add project" />
      {projects.map((p) => (
        <Panel key={p.id}>
          <div className="grid md:grid-cols-12 gap-3">
            <Field className="md:col-span-5" label="Title" value={p.title} onChange={(v) => update(p.id, { title: v })} />
            <Field className="md:col-span-2" label="Year" value={p.year} onChange={(v) => update(p.id, { year: v })} />
            <Field className="md:col-span-5" label="Role" value={p.role} onChange={(v) => update(p.id, { role: v })} />
            <Field className="md:col-span-12" label="Stack (comma separated)" value={p.stack.join(", ")}
              onChange={(v) => update(p.id, { stack: v.split(",").map((s) => s.trim()).filter(Boolean) })} />
            <Field className="md:col-span-6" label="Live demo URL" value={p.link ?? ""} onChange={(v) => update(p.id, { link: v })} />
            <Field className="md:col-span-6" label="GitHub repo URL" value={p.github ?? ""} onChange={(v) => update(p.id, { github: v })} />
            <Field className="md:col-span-12" label="Image key (project-mummyj2, project-riseflow…)" value={p.image ?? ""} onChange={(v) => update(p.id, { image: v })} />
            <TextArea className="md:col-span-12" label="Summary (one line)" value={p.description} rows={2} onChange={(v) => update(p.id, { description: v })} />
            <TextArea className="md:col-span-12" label="The problem (STAR)" value={p.problem ?? ""} rows={2} onChange={(v) => update(p.id, { problem: v })} />
            <TextArea className="md:col-span-12" label="The challenge (STAR)" value={p.challenge ?? ""} rows={2} onChange={(v) => update(p.id, { challenge: v })} />
            <TextArea className="md:col-span-12" label="The result (STAR)" value={p.result ?? ""} rows={2} onChange={(v) => update(p.id, { result: v })} />
            <DeleteRow onClick={() => remove(p.id)} />
          </div>
        </Panel>
      ))}
      {projects.length === 0 && <Empty label="No projects yet." />}
    </div>
  );
}

function ExperienceEditor({ experience, onChange }: { experience: Experience[]; onChange: (e: Experience[]) => void }) {
  const update = (i: number, patch: Partial<Experience>) =>
    onChange(experience.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));
  const add = () =>
    onChange([
      { company: "New Company", role: "Role", period: "2026 — Present", location: "Remote", bullets: ["What you did and the impact."] },
      ...experience,
    ]);
  const remove = (i: number) => onChange(experience.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-4">
      <AddBar onAdd={add} label="Add experience" />
      {experience.map((e, i) => (
        <Panel key={i}>
          <div className="grid md:grid-cols-12 gap-3">
            <Field className="md:col-span-6" label="Company" value={e.company} onChange={(v) => update(i, { company: v })} />
            <Field className="md:col-span-6" label="Role" value={e.role} onChange={(v) => update(i, { role: v })} />
            <Field className="md:col-span-6" label="Period" value={e.period} onChange={(v) => update(i, { period: v })} />
            <Field className="md:col-span-6" label="Location" value={e.location} onChange={(v) => update(i, { location: v })} />
            <TextArea className="md:col-span-12" label="Bullets (one per line)" value={e.bullets.join("\n")} rows={4}
              onChange={(v) => update(i, { bullets: v.split("\n").map((s) => s.trim()).filter(Boolean) })} />
            <DeleteRow onClick={() => remove(i)} />
          </div>
        </Panel>
      ))}
      {experience.length === 0 && <Empty label="No experience yet." />}
    </div>
  );
}

function EducationEditor({ education, onChange }: { education: Education[]; onChange: (e: Education[]) => void }) {
  const update = (i: number, patch: Partial<Education>) =>
    onChange(education.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));
  const add = () =>
    onChange([{ school: "New School", degree: "Degree", period: "2026", note: "Notes." }, ...education]);
  const remove = (i: number) => onChange(education.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-4">
      <AddBar onAdd={add} label="Add education" />
      {education.map((e, i) => (
        <Panel key={i}>
          <div className="grid md:grid-cols-12 gap-3">
            <Field className="md:col-span-6" label="School" value={e.school} onChange={(v) => update(i, { school: v })} />
            <Field className="md:col-span-6" label="Degree" value={e.degree} onChange={(v) => update(i, { degree: v })} />
            <Field className="md:col-span-4" label="Period" value={e.period} onChange={(v) => update(i, { period: v })} />
            <Field className="md:col-span-8" label="Note" value={e.note} onChange={(v) => update(i, { note: v })} />
            <DeleteRow onClick={() => remove(i)} />
          </div>
        </Panel>
      ))}
      {education.length === 0 && <Empty label="No education yet." />}
    </div>
  );
}

function CertificatesEditor({ certificates, onChange }: { certificates: Certificate[]; onChange: (c: Certificate[]) => void }) {
  const update = (id: string, patch: Partial<Certificate>) =>
    onChange(certificates.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const add = () =>
    onChange([
      { id: `cert-${Date.now()}`, title: "New Certificate", issuer: "Issuer", date: String(new Date().getFullYear()), image: "", file: "" },
      ...certificates,
    ]);
  const remove = (id: string) => onChange(certificates.filter((x) => x.id !== id));

  return (
    <div className="space-y-4">
      <AddBar onAdd={add} label="Add certificate" />
      {certificates.map((c) => (
        <Panel key={c.id}>
          <div className="grid md:grid-cols-12 gap-3">
            <Field className="md:col-span-6" label="Title" value={c.title} onChange={(v) => update(c.id, { title: v })} />
            <Field className="md:col-span-4" label="Issuer" value={c.issuer} onChange={(v) => update(c.id, { issuer: v })} />
            <Field className="md:col-span-2" label="Date" value={c.date} onChange={(v) => update(c.id, { date: v })} />
            <Field className="md:col-span-6" label="Image key (optional)" value={c.image ?? ""} onChange={(v) => update(c.id, { image: v })} />
            <Field className="md:col-span-6" label="File URL (e.g. /certificates/x.pdf)" value={c.file ?? ""} onChange={(v) => update(c.id, { file: v })} />
            <DeleteRow onClick={() => remove(c.id)} />
          </div>
        </Panel>
      ))}
      {certificates.length === 0 && <Empty label="No certificates yet." />}
    </div>
  );
}

/* ───────── Primitives ───────── */

function Panel({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-hairline bg-surface/60 p-5">{children}</div>;
}

function AddBar({ onAdd, label }: { onAdd: () => void; label: string }) {
  return (
    <button onClick={onAdd} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium hover:scale-[1.02] transition-transform">
      <Plus className="size-4" /> {label}
    </button>
  );
}

function Empty({ label }: { label: string }) {
  return <p className="text-muted-foreground text-center py-12">{label}</p>;
}

function DeleteRow({ onClick }: { onClick: () => void }) {
  return (
    <div className="md:col-span-12 flex justify-end">
      <button onClick={onClick} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive">
        <Trash2 className="size-4" /> Delete
      </button>
    </div>
  );
}

function Field({ label, value, onChange, className = "" }: { label: string; value: string; onChange: (v: string) => void; className?: string }) {
  return (
    <div className={className}>
      <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full bg-background border border-hairline rounded-xl px-3 py-2 focus:border-primary outline-none"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3, className = "" }: { label: string; value: string; onChange: (v: string) => void; rows?: number; className?: string }) {
  return (
    <div className={className}>
      <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full bg-background border border-hairline rounded-xl px-3 py-2 focus:border-primary outline-none resize-y"
      />
    </div>
  );
}

function Gate({ onPass }: { onPass: () => void }) {
  const [v, setV] = useState("");
  const [err, setErr] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (normalizePasscode(v) === normalizePasscode(PASSCODE)) {
            localStorage.setItem(PASS_KEY, "1");
            onPass();
          } else {
            setErr(true);
          }
        }}
        className="w-full max-w-sm space-y-5 rounded-3xl border border-hairline bg-surface/60 p-8"
      >
        <Lock className="size-5 text-primary" />
        <div>
          <h1 className="font-display text-3xl">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter passcode to manage portfolio.</p>
        </div>
        <input
          type="password"
          value={v}
          onChange={(e) => { setV(e.target.value); setErr(false); }}
          placeholder="Passcode"
          className="w-full bg-background border border-hairline rounded-xl px-3 py-2.5 focus:border-primary outline-none"
        />
        {err && <p className="text-sm text-destructive">Incorrect passcode.</p>}
        <button className="w-full bg-primary text-primary-foreground rounded-full py-2.5 font-medium">Enter</button>
        <p className="text-xs text-muted-foreground text-center">
          Default: <span className="font-mono">henry2026</span> — edit in <span className="font-mono">src/routes/dashboard.tsx</span>
        </p>
      </form>
    </div>
  );
}
