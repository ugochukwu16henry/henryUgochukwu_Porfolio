import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { T as Toaster, t as toast } from "../_libs/sonner.mjs";
import { u as useTheme, T as ThemeToggle } from "./router-BqKAm5ah.mjs";
import { g as getLivePortfolio, m as mergeWithSeed, s as savePortfolio, l as loadPortfolio, a as saveLivePortfolio, e as exportJson, r as resetStore } from "./portfolio.functions-D1FKdXl7.mjs";
import { s as seed } from "./portfolio-BGiy4pfb.mjs";
import "../_libs/seroval.mjs";
import { A as ArrowLeft, a as Save, D as Download, R as RotateCcw, L as Lock, P as Plus, T as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-DgkD2R5K.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
const PASS_KEY = "henry-dash:auth";
const PASSCODE = "1995Mobuchi@";
const normalizePasscode = (value) => value.trim();
function Dashboard() {
  const {
    theme
  } = useTheme();
  const [authed, setAuthed] = reactExports.useState(false);
  const [data, setData] = reactExports.useState(seed);
  const [tab, setTab] = reactExports.useState("projects");
  const [dirty, setDirty] = reactExports.useState(false);
  reactExports.useEffect(() => {
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
  const patch = (key, value) => {
    setData((d) => ({
      ...d,
      [key]: value
    }));
    setDirty(true);
  };
  const save = async () => {
    try {
      const result = await saveLivePortfolio({
        data
      });
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
    const blob = new Blob([exportJson()], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  if (!authed) return /* @__PURE__ */ jsxRuntimeExports.jsx(Gate, { onPass: () => setAuthed(true) });
  const tabs = [{
    id: "profile",
    label: "Profile"
  }, {
    id: "skills",
    label: "Skills"
  }, {
    id: "projects",
    label: "Projects"
  }, {
    id: "experience",
    label: "Experience"
  }, {
    id: "education",
    label: "Education"
  }, {
    id: "certificates",
    label: "Certificates"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { theme, position: "top-right", richColors: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-hairline sticky top-0 bg-background/80 backdrop-blur z-40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-6 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
        " Back to site"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: [
        "Portfolio · Dashboard ",
        dirty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "· unsaved" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, { variant: "inline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          localStorage.removeItem(PASS_KEY);
          setAuthed(false);
        }, className: "text-xs text-muted-foreground hover:text-primary", children: "Sign out" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-6xl px-6 py-10 space-y-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl leading-tight", children: "Manage portfolio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-2 text-sm", children: [
            "Edits live in your browser. Click ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Export JSON" }),
            " to download the file to commit."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: save, className: "inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium hover:scale-[1.02] transition-transform", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "size-4" }),
            " Save"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: download, className: "inline-flex items-center gap-2 border border-hairline px-4 py-2 rounded-full hover:border-primary hover:text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-4" }),
            " Export JSON"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: reset, className: "inline-flex items-center gap-2 border border-hairline px-4 py-2 rounded-full hover:border-destructive hover:text-destructive", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "size-4" }),
            " Reset"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 border-b border-hairline", children: tabs.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab(t.id), className: `px-4 py-2 text-sm font-mono uppercase tracking-widest border-b-2 -mb-px transition-colors ${tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`, children: t.label }, t.id)) }),
      tab === "profile" && /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileEditor, { profile: data.profile, onChange: (p) => patch("profile", p) }),
      tab === "skills" && /* @__PURE__ */ jsxRuntimeExports.jsx(SkillsEditor, { skills: data.skills, onChange: (s) => patch("skills", s) }),
      tab === "projects" && /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectsEditor, { projects: data.projects, onChange: (p) => patch("projects", p) }),
      tab === "experience" && /* @__PURE__ */ jsxRuntimeExports.jsx(ExperienceEditor, { experience: data.experience, onChange: (e) => patch("experience", e) }),
      tab === "education" && /* @__PURE__ */ jsxRuntimeExports.jsx(EducationEditor, { education: data.education, onChange: (e) => patch("education", e) }),
      tab === "certificates" && /* @__PURE__ */ jsxRuntimeExports.jsx(CertificatesEditor, { certificates: data.certificates, onChange: (c) => patch("certificates", c) })
    ] })
  ] });
}
function ProfileEditor({
  profile,
  onChange
}) {
  const set = (k, v) => onChange({
    ...profile,
    [k]: v
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", value: profile.name, onChange: (v) => set("name", v) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full name", value: profile.fullName, onChange: (v) => set("fullName", v) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Title", value: profile.title, onChange: (v) => set("title", v) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Location", value: profile.location, onChange: (v) => set("location", v) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", value: profile.email, onChange: (v) => set("email", v) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone", value: profile.phone, onChange: (v) => set("phone", v) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "LinkedIn URL", value: profile.linkedin, onChange: (v) => set("linkedin", v), className: "md:col-span-2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "GitHub URL", value: profile.github, onChange: (v) => set("github", v), className: "md:col-span-2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TextArea, { label: "Tagline", value: profile.tagline, onChange: (v) => set("tagline", v), className: "md:col-span-2", rows: 2 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TextArea, { label: "Summary", value: profile.summary, onChange: (v) => set("summary", v), className: "md:col-span-2", rows: 5 })
  ] }) });
}
function SkillsEditor({
  skills,
  onChange
}) {
  const set = (k, v) => onChange({
    ...skills,
    [k]: v.split(",").map((x) => x.trim()).filter(Boolean)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Engineering (comma separated)", value: skills.engineering.join(", "), onChange: (v) => set("engineering", v) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Data & APIs (comma separated)", value: skills.data.join(", "), onChange: (v) => set("data", v) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Craft (comma separated)", value: skills.craft.join(", "), onChange: (v) => set("craft", v) })
  ] }) });
}
function ProjectsEditor({
  projects,
  onChange
}) {
  const update = (id, patch) => onChange(projects.map((x) => x.id === id ? {
    ...x,
    ...patch
  } : x));
  const add = () => onChange([{
    id: `proj-${Date.now()}`,
    title: "New Project",
    year: String((/* @__PURE__ */ new Date()).getFullYear()),
    role: "Lead Developer",
    stack: ["React"],
    description: "One-line summary for the card header.",
    problem: "What problem does this solve?",
    challenge: "What was hard — technically or architecturally?",
    result: "What shipped and what impact did it have?",
    image: "",
    link: "",
    github: ""
  }, ...projects]);
  const remove = (id) => onChange(projects.filter((x) => x.id !== id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddBar, { onAdd: add, label: "Add project" }),
    projects.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-12 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "md:col-span-5", label: "Title", value: p.title, onChange: (v) => update(p.id, {
        title: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "md:col-span-2", label: "Year", value: p.year, onChange: (v) => update(p.id, {
        year: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "md:col-span-5", label: "Role", value: p.role, onChange: (v) => update(p.id, {
        role: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "md:col-span-12", label: "Stack (comma separated)", value: p.stack.join(", "), onChange: (v) => update(p.id, {
        stack: v.split(",").map((s) => s.trim()).filter(Boolean)
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "md:col-span-6", label: "Live demo URL", value: p.link ?? "", onChange: (v) => update(p.id, {
        link: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "md:col-span-6", label: "GitHub repo URL", value: p.github ?? "", onChange: (v) => update(p.id, {
        github: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "md:col-span-12", label: "Image key (gpg, mega, e-book, riseflowschool…)", value: p.image ?? "", onChange: (v) => update(p.id, {
        image: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextArea, { className: "md:col-span-12", label: "Summary (one line)", value: p.description, rows: 2, onChange: (v) => update(p.id, {
        description: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextArea, { className: "md:col-span-12", label: "The problem (STAR)", value: p.problem ?? "", rows: 2, onChange: (v) => update(p.id, {
        problem: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextArea, { className: "md:col-span-12", label: "The challenge (STAR)", value: p.challenge ?? "", rows: 2, onChange: (v) => update(p.id, {
        challenge: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextArea, { className: "md:col-span-12", label: "The result (STAR)", value: p.result ?? "", rows: 2, onChange: (v) => update(p.id, {
        result: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteRow, { onClick: () => remove(p.id) })
    ] }) }, p.id)),
    projects.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { label: "No projects yet." })
  ] });
}
function ExperienceEditor({
  experience,
  onChange
}) {
  const update = (i, patch) => onChange(experience.map((x, idx) => idx === i ? {
    ...x,
    ...patch
  } : x));
  const add = () => onChange([{
    company: "New Company",
    role: "Role",
    period: "2026 — Present",
    location: "Remote",
    bullets: ["What you did and the impact."]
  }, ...experience]);
  const remove = (i) => onChange(experience.filter((_, idx) => idx !== i));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddBar, { onAdd: add, label: "Add experience" }),
    experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-12 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "md:col-span-6", label: "Company", value: e.company, onChange: (v) => update(i, {
        company: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "md:col-span-6", label: "Role", value: e.role, onChange: (v) => update(i, {
        role: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "md:col-span-6", label: "Period", value: e.period, onChange: (v) => update(i, {
        period: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "md:col-span-6", label: "Location", value: e.location, onChange: (v) => update(i, {
        location: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextArea, { className: "md:col-span-12", label: "Bullets (one per line)", value: e.bullets.join("\n"), rows: 4, onChange: (v) => update(i, {
        bullets: v.split("\n").map((s) => s.trim()).filter(Boolean)
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteRow, { onClick: () => remove(i) })
    ] }) }, i)),
    experience.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { label: "No experience yet." })
  ] });
}
function EducationEditor({
  education,
  onChange
}) {
  const update = (i, patch) => onChange(education.map((x, idx) => idx === i ? {
    ...x,
    ...patch
  } : x));
  const add = () => onChange([{
    school: "New School",
    degree: "Degree",
    period: "2026",
    note: "Notes."
  }, ...education]);
  const remove = (i) => onChange(education.filter((_, idx) => idx !== i));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddBar, { onAdd: add, label: "Add education" }),
    education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-12 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "md:col-span-6", label: "School", value: e.school, onChange: (v) => update(i, {
        school: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "md:col-span-6", label: "Degree", value: e.degree, onChange: (v) => update(i, {
        degree: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "md:col-span-4", label: "Period", value: e.period, onChange: (v) => update(i, {
        period: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "md:col-span-8", label: "Note", value: e.note, onChange: (v) => update(i, {
        note: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteRow, { onClick: () => remove(i) })
    ] }) }, i)),
    education.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { label: "No education yet." })
  ] });
}
function CertificatesEditor({
  certificates,
  onChange
}) {
  const update = (id, patch) => onChange(certificates.map((x) => x.id === id ? {
    ...x,
    ...patch
  } : x));
  const add = () => onChange([{
    id: `cert-${Date.now()}`,
    title: "New Certificate",
    issuer: "Issuer",
    date: String((/* @__PURE__ */ new Date()).getFullYear()),
    image: "",
    file: ""
  }, ...certificates]);
  const remove = (id) => onChange(certificates.filter((x) => x.id !== id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddBar, { onAdd: add, label: "Add certificate" }),
    certificates.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-12 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "md:col-span-6", label: "Title", value: c.title, onChange: (v) => update(c.id, {
        title: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "md:col-span-4", label: "Issuer", value: c.issuer, onChange: (v) => update(c.id, {
        issuer: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "md:col-span-2", label: "Date", value: c.date, onChange: (v) => update(c.id, {
        date: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "md:col-span-6", label: "Image key (optional)", value: c.image ?? "", onChange: (v) => update(c.id, {
        image: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "md:col-span-6", label: "File URL (e.g. /certificates/x.pdf)", value: c.file ?? "", onChange: (v) => update(c.id, {
        file: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteRow, { onClick: () => remove(c.id) })
    ] }) }, c.id)),
    certificates.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { label: "No certificates yet." })
  ] });
}
function Panel({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-hairline bg-surface/60 p-5", children });
}
function AddBar({
  onAdd,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onAdd, className: "inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium hover:scale-[1.02] transition-transform", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
    " ",
    label
  ] });
}
function Empty({
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center py-12", children: label });
}
function DeleteRow({
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-12 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick, className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }),
    " Delete"
  ] }) });
}
function Field({
  label,
  value,
  onChange,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (e) => onChange(e.target.value), className: "mt-1 w-full bg-background border border-hairline rounded-xl px-3 py-2 focus:border-primary outline-none" })
  ] });
}
function TextArea({
  label,
  value,
  onChange,
  rows = 3,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows, value, onChange: (e) => onChange(e.target.value), className: "mt-1 w-full bg-background border border-hairline rounded-xl px-3 py-2 focus:border-primary outline-none resize-y" })
  ] });
}
function Gate({
  onPass
}) {
  const [v, setV] = reactExports.useState("");
  const [err, setErr] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-background px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
    e.preventDefault();
    if (normalizePasscode(v) === normalizePasscode(PASSCODE)) {
      localStorage.setItem(PASS_KEY, "1");
      onPass();
    } else {
      setErr(true);
    }
  }, className: "w-full max-w-sm space-y-5 rounded-3xl border border-hairline bg-surface/60 p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "size-5 text-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Enter passcode to manage portfolio." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: v, onChange: (e) => {
      setV(e.target.value);
      setErr(false);
    }, placeholder: "Passcode", className: "w-full bg-background border border-hairline rounded-xl px-3 py-2.5 focus:border-primary outline-none" }),
    err && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: "Incorrect passcode." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-full bg-primary text-primary-foreground rounded-full py-2.5 font-medium", children: "Enter" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
      "Passcode is configured in ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "src/routes/dashboard.tsx" })
    ] })
  ] }) });
}
export {
  Dashboard as component
};
