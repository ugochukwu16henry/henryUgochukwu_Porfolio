import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { g as getLivePortfolio, l as loadPortfolio } from "./portfolio.functions-BwXrxY4E.mjs";
import { T as ThemeToggle } from "./router-BE1Ih542.mjs";
import { R as Root, T as Trigger, P as Portal, C as Content, a as Close, b as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { s as seed } from "./portfolio-C3mz8jZY.mjs";
import "../_libs/seroval.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { b as Sparkles, c as ArrowUpRight, d as MapPin, G as Github, e as Linkedin, C as CodeXml, f as Database, W as Wrench, g as GraduationCap, h as Award, F as FileText, i as Mail, j as Phone, X } from "../_libs/lucide-react.mjs";
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
import "./server-rSWosdHT.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const portraitImg = "/assets/henry-profile-BBIzd_xn.jpeg";
const degreeImg = "/assets/byui-degree-y-D1N98C.png";
const aasSoftwareDevelopmentImg = "/assets/AAS%20Software%20Development-CMFq5zBE.png";
const mummyImg = "/assets/project-mummyj2-BPmKyHwK.png";
const riseflowImg = "/assets/project-riseflow-BSZrJAsr.png";
const webAndComputerProgrammingImg = "/assets/Web%20and%20computer%20programming%20certificate-Cd6V90HU.png";
const webDevelopmentImg = "/assets/web%20development%20certificate-CEdsgrNo.png";
const imageAssets = {
  "byui-degree": degreeImg,
  "aas-software-development": aasSoftwareDevelopmentImg,
  "project-mummyj2": mummyImg,
  "project-riseflow": riseflowImg,
  "web-and-computer-programming-certificate": webAndComputerProgrammingImg,
  "web-development-certificate": webDevelopmentImg
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Dialog = Root;
const DialogTrigger = Trigger;
const DialogPortal = Portal;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
function Home() {
  const [data, setData] = reactExports.useState(seed);
  reactExports.useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const live = await getLivePortfolio();
        if (!cancelled) {
          setData(live.portfolio);
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
  const {
    profile,
    skills,
    projects,
    experience,
    education,
    certificates
  } = data;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground antialiased", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, { profile }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MarqueeStrip, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(About, { profile, skills }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Projects, { projects }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Experience, { experience }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Education, { education }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Certificates, { certificates }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Contact, { profile }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Nav() {
  const links = [{
    href: "#about",
    label: "About"
  }, {
    href: "#work",
    label: "Work"
  }, {
    href: "#experience",
    label: "Experience"
  }, {
    href: "#certificates",
    label: "Certificates"
  }, {
    href: "#contact",
    label: "Contact"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-hairline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2 rounded-full bg-primary shadow-glow group-hover:scale-125 transition-transform" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs tracking-widest uppercase text-muted-foreground", children: "HU / Portfolio · 2026" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-7 text-sm", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: l.href, className: "text-muted-foreground hover:text-foreground transition-colors", children: l.label }, l.href)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, { variant: "inline" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border border-hairline hover:border-primary hover:text-primary transition-colors", children: "Dashboard" })
    ] })
  ] }) });
}
function Hero({
  profile
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-glow pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grain opacity-60 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-28 grid lg:grid-cols-12 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7 space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 12
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6
        }, className: "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground border border-hairline rounded-full px-3 py-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3 text-primary" }),
          "Available for remote engineering roles"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
          opacity: 0,
          y: 16
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.7,
          delay: 0.05
        }, className: "font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95]", children: [
          "Building software that feels",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-primary", children: "deliberate" }),
          " —",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "for people, by an engineer."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, transition: {
          duration: 0.7,
          delay: 0.2
        }, className: "text-lg text-muted-foreground max-w-xl", children: profile.tagline }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 10
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6,
          delay: 0.3
        }, className: "flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#work", className: "group inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full font-medium shadow-glow hover:scale-[1.02] transition-transform", children: [
            "See selected work",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#contact", className: "inline-flex items-center gap-2 border border-hairline px-5 py-3 rounded-full hover:border-primary hover:text-primary transition-colors", children: "Get in touch" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5 pt-6 text-muted-foreground text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4" }),
            " ",
            profile.location
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: profile.github, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 hover:text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "size-4" }),
            " GitHub"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: profile.linkedin, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 hover:text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Linkedin, { className: "size-4" }),
            " LinkedIn"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        scale: 0.96
      }, animate: {
        opacity: 1,
        scale: 1
      }, transition: {
        duration: 0.8,
        delay: 0.15
      }, className: "lg:col-span-5 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-elegant border border-hairline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: portraitImg, alt: `${profile.name} portrait`, className: "size-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-5 left-5 right-5 flex items-end justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Currently" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "QA Engineer @ H10 AI · Founder @ Henrymo" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-3 rounded-full bg-primary shadow-glow animate-pulse" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-6 -left-6 hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface border border-hairline rounded-2xl px-4 py-3 shadow-elegant", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: "Years coding" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl", children: "6+" })
        ] }) })
      ] })
    ] })
  ] });
}
function MarqueeStrip() {
  const items = ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Azure", "Spring Boot", ".NET", "Tailwind", "Jest", "Playwright"];
  const row = [...items, ...items];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-y border-hairline bg-surface/40 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-12 py-5 animate-[scroll_30s_linear_infinite] font-mono text-sm uppercase tracking-widest text-muted-foreground whitespace-nowrap", children: row.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-12", children: [
      t,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-primary/60" })
    ] }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `@keyframes scroll { from { transform: translateX(0) } to { transform: translateX(-50%) } }` })
  ] });
}
function SectionHead({
  kicker,
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-6 mb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-primary mb-3", children: kicker }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl sm:text-5xl leading-tight max-w-2xl", children: title })
    ] }),
    children
  ] });
}
function About({
  profile,
  skills
}) {
  const groups = [{
    icon: CodeXml,
    label: "Engineering",
    items: skills.engineering
  }, {
    icon: Database,
    label: "Data & APIs",
    items: skills.data
  }, {
    icon: Wrench,
    label: "Craft",
    items: skills.craft
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "about", className: "mx-auto max-w-7xl px-6 lg:px-10 py-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { kicker: "01 · About", title: "An engineer with a people-first operating system." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-12 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "lg:col-span-7 text-lg text-muted-foreground leading-relaxed", children: profile.summary }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-5 space-y-4", children: groups.map(({
        icon: Icon,
        label,
        items
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-hairline bg-surface/60 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest", children: label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: items.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2.5 py-1 rounded-full bg-surface-2 border border-hairline", children: s }, s)) })
      ] }, label)) })
    ] })
  ] });
}
function Projects({
  projects
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "work", className: "border-t border-[#1e293b] bg-[#0a0e14] text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 lg:px-10 py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold tracking-[0.2em] text-[#38bdf8] uppercase", children: "Projects" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl", children: "Featured Full Stack Projects" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-3xl text-base leading-relaxed text-[#9ca3af]", children: "Each project includes live URL, repository, stack, and a detailed breakdown using the STAR method." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-6 md:grid-cols-2 lg:gap-8", children: projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectCard, { project: p, index: i }, p.id)) })
  ] }) });
}
function ProjectCard({
  project: p,
  index
}) {
  const img = p.image ? imageAssets[p.image] : void 0;
  const outlineBtn = "inline-flex items-center justify-center rounded-lg border border-[#4b5563] bg-transparent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#9ca3af] hover:bg-white/5 disabled:pointer-events-none disabled:opacity-40";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.article, { initial: {
    opacity: 0,
    y: 16
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true,
    margin: "-80px"
  }, transition: {
    duration: 0.45,
    delay: index * 0.06
  }, className: "flex flex-col overflow-hidden rounded-xl border border-[#1f2937] bg-[#111827] shadow-lg shadow-black/20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[16/10] overflow-hidden bg-[#1f2937]", children: img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: p.title, className: "size-full object-cover object-top" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex size-full items-center justify-center px-6 text-center text-sm text-[#6b7280]", children: p.title }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-4 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold leading-snug text-white", children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-[#9ca3af]", children: p.description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: p.stack.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-[#374151] px-3 py-1 text-xs font-medium text-[#d1d5db]", children: s }, s)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex flex-wrap gap-2 pt-2", children: [
        p.link ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: p.link, target: "_blank", rel: "noreferrer", className: "inline-flex items-center justify-center rounded-lg bg-[#3b82f6] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2563eb]", children: "Live Project" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: outlineBtn, "aria-disabled": true, children: "Live Project" }),
        p.github ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: p.github, target: "_blank", rel: "noreferrer", className: outlineBtn, children: "GitHub Repo" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: outlineBtn, "aria-disabled": true, children: "GitHub Repo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: outlineBtn, children: "View Details" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[85vh] overflow-y-auto border-[#374151] bg-[#111827] text-white sm:max-w-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl text-white", children: p.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { className: "text-[#9ca3af]", children: [
                p.role,
                " · ",
                p.year
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "space-y-4 text-sm", children: [
              p.problem && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "mb-1 text-xs font-semibold uppercase tracking-wider text-[#38bdf8]", children: "The problem" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "leading-relaxed text-[#d1d5db]", children: p.problem })
              ] }),
              p.challenge && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "mb-1 text-xs font-semibold uppercase tracking-wider text-[#38bdf8]", children: "The challenge" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "leading-relaxed text-[#d1d5db]", children: p.challenge })
              ] }),
              p.result && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "mb-1 text-xs font-semibold uppercase tracking-wider text-[#38bdf8]", children: "The result" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "leading-relaxed text-[#d1d5db]", children: p.result })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Experience({
  experience
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "experience", className: "mx-auto max-w-7xl px-6 lg:px-10 py-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { kicker: "03 · Experience", title: "Where I’ve shipped, taught, and led." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "relative border-l border-hairline ml-3 space-y-10", children: experience.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "pl-8 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-[7px] top-2 size-3 rounded-full bg-primary shadow-glow" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl", children: e.role }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: e.period })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary text-sm mb-3", children: [
        e.company,
        " · ",
        e.location
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 text-muted-foreground", children: e.bullets.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 leading-relaxed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary mt-2 size-1 rounded-full bg-primary shrink-0" }),
        b
      ] }, b)) })
    ] }, e.company + e.role)) })
  ] });
}
function Education({
  education
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-hairline bg-surface/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 lg:px-10 py-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { kicker: "04 · Education", title: "Two degrees. One lens on technology and people." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-5", children: education.map((ed) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-hairline bg-background p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "size-5 text-primary mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: ed.period }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl mt-1 mb-1", children: ed.degree }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: ed.school }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-3", children: ed.note })
    ] }, ed.degree)) })
  ] }) });
}
function Certificates({
  certificates
}) {
  const featured = certificates.find((c) => c.image === "byui-degree" && imageAssets[c.image]) ?? certificates.find((c) => c.image && imageAssets[c.image]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "certificates", className: "mx-auto max-w-7xl px-6 lg:px-10 py-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { kicker: "05 · Certificates", title: "Conferred degrees and continuing study." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-6", children: [
      featured && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-1 rounded-3xl border border-hairline bg-surface/60 p-3 overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: imageAssets[featured.image], alt: featured.title, className: "rounded-2xl w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-3 px-2 pb-2", children: [
          featured.issuer,
          " · ",
          featured.date
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${featured ? "lg:col-span-2" : "lg:col-span-3"} grid sm:grid-cols-2 gap-3`, children: certificates.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "group rounded-2xl border border-hairline bg-background p-5 hover:border-primary/60 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "size-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: c.date }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium leading-snug", children: c.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: c.issuer }),
          c.file && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: c.file, target: "_blank", rel: "noreferrer", className: "text-primary text-xs mt-2 inline-flex items-center gap-1 hover:underline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-3" }),
            " View PDF ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-3" })
          ] }),
          !c.file && c.image && imageAssets[c.image] && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: imageAssets[c.image], target: "_blank", rel: "noreferrer", className: "text-primary text-xs mt-2 inline-flex items-center gap-1 hover:underline", children: [
            "View certificate ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-3" })
          ] })
        ] })
      ] }) }, c.id)) })
    ] })
  ] });
}
function Contact({
  profile
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "contact", className: "relative border-t border-hairline overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-glow pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 lg:px-10 py-32 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-primary mb-4", children: "06 · Let’s build" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] max-w-4xl", children: [
        "Got a hard problem? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "Bring it." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-muted-foreground text-lg max-w-2xl", children: "I'm open to remote full-stack engineering roles, contract builds, and meaningful collaborations. The fastest way to reach me is email." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactCard, { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactCard, { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactCard, { icon: Linkedin, label: "LinkedIn", value: "ugochukwuhenry", href: profile.linkedin }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactCard, { icon: Github, label: "GitHub", value: "ugochukwu16henry", href: profile.github })
      ] })
    ] })
  ] });
}
function ContactCard({
  icon: Icon,
  label,
  value,
  href
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href, target: "_blank", rel: "noreferrer", className: "group rounded-2xl border border-hairline bg-surface/60 p-5 hover:border-primary hover:bg-surface transition-colors block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4 text-primary mb-3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm break-all group-hover:text-primary transition-colors", children: value })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-hairline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 lg:px-10 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest", children: "© 2026 Henry Ugochukwu" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest", children: "Built with intent · React · TanStack Start" })
  ] }) });
}
export {
  Home as component
};
