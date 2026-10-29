import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { g as getLivePortfolio, m as mergeWithSeed, l as loadPortfolio } from "./portfolio.functions-DayYaPm3.mjs";
import { T as ThemeToggle, z as zentrixIcon, p as portraitImage, r as resolvePortfolioImage, a as resumePdf } from "./router-DJFfbh0K.mjs";
import { R as Root, T as Trigger, P as Portal, C as Content, a as Close, b as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { s as seed } from "./portfolio-DDnDtgvB.mjs";
import "../_libs/seroval.mjs";
import { u as useScroll, a as useSpring, m as motion } from "../_libs/framer-motion.mjs";
import { G as GraduationCap, b as ArrowUpRight, c as ArrowRight, F as FileText, d as MapPin, C as CodeXml, e as Database, W as Wrench, f as Rocket, H as HeartHandshake, g as ShieldCheck, h as CircleCheck, i as Award, j as Layers, k as Cloud, B as Bot, l as PenTool, m as Compass, n as LifeBuoy, o as Briefcase, p as Sparkles, q as Mail, r as Phone, s as Linkedin, t as Github, u as CirclePlay, L as Lock, X } from "../_libs/lucide-react.mjs";
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
import "./server-DJTegBF4.mjs";
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
function openStaticAsset(path, event) {
  event?.preventDefault();
  event?.stopPropagation();
  const url = path.startsWith("http") ? path : `${window.location.origin}${path.startsWith("/") ? path : `/${path}`}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
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
  const {
    profile,
    skills,
    projects,
    experience,
    education,
    certificates
  } = data;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground antialiased overflow-x-clip", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollProgress, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, { profile }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, { profile, projects }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MarqueeStrip, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(About, { profile, skills }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Graduation, { certificates }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Zentrix, { profile }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Projects, { projects }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Experience, { experience }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Education, { education }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Certificates, { certificates }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Contact, { profile }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, { profile }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingHire, { profile })
  ] });
}
const resumeDownloadName = "Henry-Ugochukwu-Resume-May-2026.pdf";
const featuredDegreeId = "byui-bssd";
function hireHref(profile) {
  return `mailto:${profile.email}?subject=${encodeURIComponent("Let's work together")}`;
}
function companyUrl(profile) {
  return profile.companyUrl || "https://www.zentrixsoftware.org";
}
function ResumeLink({
  className,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: resumePdf, download: resumeDownloadName, target: "_blank", rel: "noopener noreferrer", className, children });
}
const fadeUp = {
  initial: {
    opacity: 0,
    y: 18
  },
  whileInView: {
    opacity: 1,
    y: 0
  },
  viewport: {
    once: true,
    margin: "-80px"
  },
  transition: {
    duration: 0.6,
    ease: [0.2, 0.8, 0.2, 1]
  }
};
function ScrollProgress() {
  const {
    scrollYProgress
  } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: {
    scaleX
  }, className: "fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary", "aria-hidden": true });
}
function Nav({
  profile
}) {
  const links = [{
    href: "#about",
    label: "About"
  }, {
    href: "#zentrix",
    label: "Zentrix"
  }, {
    href: "#work",
    label: "Work"
  }, {
    href: "#experience",
    label: "Experience"
  }, {
    href: "#credentials",
    label: "Credentials"
  }, {
    href: "#contact",
    label: "Contact"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 backdrop-blur-xl bg-background/75 border-b border-hairline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5 group min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg shadow-glow group-hover:scale-105 transition-transform", children: "H" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:block truncate font-medium", children: profile.name })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden lg:flex items-center gap-7 text-sm", children: links.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: l.href, className: "text-muted-foreground hover:text-foreground transition-colors", children: l.label }, l.href)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, { variant: "inline" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResumeLink, { className: "hidden sm:inline-flex font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border border-hairline hover:border-primary hover:text-primary transition-colors", children: "Resume" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "hidden md:inline-flex font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border border-hairline hover:border-primary hover:text-primary transition-colors", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: hireHref(profile), className: "inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-glow hover:scale-[1.03] transition-transform", children: "Hire me" })
    ] })
  ] }) });
}
function Hero({
  profile,
  projects
}) {
  const live = projects.filter((p) => p.status === "Live").length;
  const stats = [{
    value: `${projects.length}`,
    label: "Products built"
  }, {
    value: `${live}`,
    label: "Live in production"
  }, {
    value: "2",
    label: "B.S. degrees"
  }, {
    value: "6+",
    label: "Years coding"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-grid pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-glow pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grain opacity-60 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-14 sm:pt-20 pb-20 sm:pb-28 grid lg:grid-cols-12 gap-14 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7 space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 12
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.6
        }, className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "size-3.5" }),
            "Class of 2026 · B.S. Software Development"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-hairline px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex size-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex size-2 rounded-full bg-emerald-500" })
            ] }),
            "Open to remote roles"
          ] })
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
        }, className: "font-display text-[2.75rem] leading-[0.98] sm:text-6xl lg:text-7xl", children: [
          "I turn hard problems into software people",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-gradient", children: "rely on." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, transition: {
          duration: 0.7,
          delay: 0.2
        }, className: "text-lg text-muted-foreground max-w-xl leading-relaxed", children: profile.tagline }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.a, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, transition: {
          duration: 0.7,
          delay: 0.25
        }, href: companyUrl(profile), target: "_blank", rel: "noreferrer", className: "group inline-flex items-center gap-3 rounded-2xl border border-hairline bg-surface/70 py-2 pl-2 pr-4 hover:border-primary/60 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: zentrixIcon, alt: "", className: "size-9 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-left leading-tight", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: profile.companyRole || "Co-Founder" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-sm font-medium", children: profile.company || "Zentrix Software Solutions" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" })
        ] }),
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: hireHref(profile), className: "group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-full font-medium shadow-glow hover:scale-[1.02] transition-transform", children: [
            "Let's work together",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4 group-hover:translate-x-0.5 transition-transform" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#work", className: "inline-flex items-center gap-2 border border-hairline px-6 py-3.5 rounded-full hover:border-primary hover:text-primary transition-colors", children: "See my work" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(ResumeLink, { className: "inline-flex items-center gap-2 px-3 py-3.5 text-muted-foreground hover:text-primary transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-4" }),
            "Resume"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.dl, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, transition: {
          duration: 0.7,
          delay: 0.4
        }, className: "grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background/90 px-4 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "sr-only", children: s.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "font-display text-3xl sm:text-4xl", children: s.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: s.label })
        ] }, s.label)) })
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
      }, className: "lg:col-span-5 relative mx-auto w-full max-w-md lg:max-w-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-4 rounded-[2.5rem] bg-primary/20 blur-3xl", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-elegant border border-hairline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: portraitImage, alt: `${profile.name} portrait`, className: "size-full object-cover" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-5 left-5 right-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl leading-none", children: profile.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: profile.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-3.5" }),
              " ",
              profile.location
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          x: -16
        }, animate: {
          opacity: 1,
          x: 0
        }, transition: {
          duration: 0.6,
          delay: 0.6
        }, className: "absolute -left-3 sm:-left-8 top-8 rounded-2xl border border-hairline bg-surface/95 px-4 py-3 shadow-elegant backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid size-9 place-items-center rounded-xl bg-primary/15 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "size-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Graduated · Aug 2026" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "BYU-Idaho" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          x: 16
        }, animate: {
          opacity: 1,
          x: 0
        }, transition: {
          duration: 0.6,
          delay: 0.75
        }, className: "absolute -right-3 sm:-right-6 bottom-28 rounded-2xl border border-hairline bg-surface/95 px-4 py-3 shadow-elegant backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: zentrixIcon, alt: "", className: "size-9 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Co-Founder" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Zentrix Software" })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
function MarqueeStrip() {
  const items = ["React", "Next.js", "NestJS", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Paystack", "AWS", "Docker", "Android", ".NET", "Spring Boot", "Playwright"];
  const row = [...items, ...items];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-y border-hairline bg-surface/40 overflow-hidden", "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-max gap-12 py-5 animate-[marquee_40s_linear_infinite] font-mono text-sm uppercase tracking-widest text-muted-foreground whitespace-nowrap", children: row.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-12", children: [
    t,
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-primary/60" })
  ] }, i)) }) });
}
function SectionHead({
  kicker,
  title,
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, className: `flex flex-wrap items-end justify-between gap-6 mb-12 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-primary mb-3", children: kicker }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl sm:text-5xl leading-[1.05] max-w-3xl", children: title })
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
    label: "Data, Cloud & Payments",
    items: skills.data
  }, {
    icon: Wrench,
    label: "Craft",
    items: skills.craft
  }];
  const promises = [{
    icon: Rocket,
    title: "Ownership, idea to launch",
    body: "Discovery, architecture, build, tests, deploy, and support — one accountable engineer."
  }, {
    icon: HeartHandshake,
    title: "People-first product sense",
    body: "A second degree in family studies means I design around how real people behave."
  }, {
    icon: ShieldCheck,
    title: "Ship fast, ship safe",
    body: "CI that blocks bad merges, real test suites, and payment flows handled with care."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "about", className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-24 sm:py-28 scroll-mt-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { kicker: "01 · About", title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "Engineer, founder, and fresh graduate —",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-primary", children: "built for real-world software." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-12 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, className: "lg:col-span-7 space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground leading-relaxed", children: profile.summary }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-3 gap-3", children: promises.map(({
          icon: Icon,
          title,
          body
        }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lift rounded-2xl border border-hairline bg-surface/60 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5 text-primary mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium leading-snug", children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground leading-relaxed", children: body })
        ] }, title)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { ...fadeUp, className: "lg:col-span-5 space-y-4", children: groups.map(({
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
function Graduation({
  certificates
}) {
  const degree = certificates.find((c) => c.id === featuredDegreeId);
  const src = degree ? resolvePortfolioImage(degree.image) : void 0;
  if (!degree || !src) return null;
  const pdf = degree.file || src;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative border-t border-hairline bg-surface/30 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-glow pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-24 sm:py-28 grid lg:grid-cols-12 gap-12 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, className: "lg:col-span-5 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-primary", children: "02 · Milestone" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-5xl sm:text-6xl leading-[0.98]", children: [
          "Officially a ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-gradient", children: "Software Developer." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg text-muted-foreground leading-relaxed", children: [
          "On 15 August 2026, Brigham Young University–Idaho conferred my",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Bachelor of Science in Software Development" }),
          " ",
          "— my second bachelor's degree. It sits on years of shipping real products, so the theory comes with receipts."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5 text-sm", children: ["Full-stack web, .NET, data structures, and web services", "Associate of Applied Science in Software Development", "Certificates in Web Development and Web & Computer Programming"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2.5 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4 text-primary mt-0.5 shrink-0" }),
          " ",
          t
        ] }, t)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: pdf, onClick: (e) => openStaticAsset(pdf, e), className: "inline-flex items-center gap-2 rounded-full border border-hairline px-5 py-3 hover:border-primary hover:text-primary transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "size-4" }),
          " View degree certificate ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 24,
        rotate: -1.5
      }, whileInView: {
        opacity: 1,
        y: 0,
        rotate: -1.5
      }, viewport: {
        once: true,
        margin: "-80px"
      }, transition: {
        duration: 0.8
      }, whileHover: {
        rotate: 0,
        scale: 1.01
      }, className: "lg:col-span-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: src, onClick: (e) => openStaticAsset(src, e), className: "gold-frame block rounded-[1.4rem] p-[3px] shadow-elegant", "aria-label": `Open ${degree.title} certificate`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-[1.25rem] bg-white p-2 sm:p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: `${degree.title} diploma — ${degree.issuer}`, className: "w-full rounded-xl" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: [
          degree.title,
          " · ",
          degree.issuer,
          " · ",
          degree.date
        ] })
      ] })
    ] })
  ] });
}
function Zentrix({
  profile
}) {
  const url = companyUrl(profile);
  const services = [{
    icon: Layers,
    title: "Custom Software",
    body: "Web, mobile, and platform builds"
  }, {
    icon: Cloud,
    title: "Cloud, DevOps & SRE",
    body: "Pipelines, infra, uptime"
  }, {
    icon: Bot,
    title: "AI & Automation",
    body: "LLM features and workflow automation"
  }, {
    icon: PenTool,
    title: "Product Design",
    body: "UX that converts and retains"
  }, {
    icon: Compass,
    title: "Technical Consulting",
    body: "Architecture and roadmap calls"
  }, {
    icon: LifeBuoy,
    title: "Maintenance & Support",
    body: "Post-launch care that stays"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "zentrix", className: "relative scroll-mt-16 bg-[#07090c] text-white overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none", style: {
      backgroundImage: "radial-gradient(50% 50% at 80% 10%, rgba(0,224,138,0.16) 0%, transparent 70%)"
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-24 sm:py-28", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, className: "grid lg:grid-cols-12 gap-12 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-6 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: zentrixIcon, alt: "Zentrix logo", className: "size-12 rounded-2xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-[#00e08a]", children: "03 · Co-Founder" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/60", children: profile.company || "Zentrix Software Solutions" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-5xl sm:text-6xl leading-[0.98]", children: [
            "Every software problem, ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-[#00e08a]", children: "solved." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-white/70 leading-relaxed", children: "I co-founded Zentrix Software Solutions, a registered Nigerian engineering studio (CAMA 2020 · RC/BN 9648404). We design, build, and scale software that businesses and founders rely on — and we prove it with our own products, like Zentrix Market." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `${url.replace(/\/$/, "")}/contact`, target: "_blank", rel: "noreferrer", className: "group inline-flex items-center gap-2 rounded-full bg-[#00e08a] px-6 py-3.5 font-medium text-[#04110b] hover:brightness-110 transition", children: [
              "Start a project with Zentrix",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4 group-hover:translate-x-0.5 transition-transform" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: url, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 hover:border-[#00e08a] hover:text-[#00e08a] transition-colors", children: [
              "zentrixsoftware.org ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/50", children: "Working across Africa, EU, and US time zones." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: url, target: "_blank", rel: "noreferrer", className: "lg:col-span-6 block group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserFrame, { url: "zentrixsoftware.org", dark: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: resolvePortfolioImage("zentrix-website"), alt: "Zentrix Software Solutions website", className: "w-full aspect-[16/10] object-cover object-top group-hover:scale-[1.02] transition-transform duration-700" }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid grid-cols-2 lg:grid-cols-3 gap-3", children: services.map(({
        icon: Icon,
        title,
        body
      }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 14
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.45,
        delay: i * 0.05
      }, className: "rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-[#00e08a]/50 hover:bg-white/[0.05] transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5 text-[#00e08a] mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/60", children: body })
      ] }, title)) })
    ] })
  ] });
}
function BrowserFrame({
  url,
  dark,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `overflow-hidden rounded-2xl border shadow-elegant ${dark ? "border-white/10 bg-[#0f1318]" : "border-hairline bg-surface"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 px-4 py-2.5 border-b ${dark ? "border-white/10" : "border-hairline"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2.5 rounded-full bg-[#ff5f57]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2.5 rounded-full bg-[#febc2e]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2.5 rounded-full bg-[#28c840]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `ml-3 min-w-0 flex-1 truncate rounded-md px-3 py-1 font-mono text-[11px] ${dark ? "bg-white/5 text-white/50" : "bg-background text-muted-foreground"}`, children: url })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children })
  ] });
}
function hostOf(link) {
  if (!link) return "";
  try {
    return new URL(link).host.replace(/^www\./, "");
  } catch {
    return link;
  }
}
function ProjectVisual({
  project: p,
  className = ""
}) {
  const img = resolvePortfolioImage(p.image);
  const label = hostOf(p.link) || (p.status ? `${p.status.toLowerCase()} · ${p.id}` : p.id);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserFrame, { url: label, children: img ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: `${p.title} screenshot`, loading: "lazy", className: `w-full aspect-[16/10] object-cover object-top transition-transform duration-700 group-hover:scale-[1.03] ${className}` }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/25 via-surface to-surface-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-grid" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-10 -bottom-10 size-48 rounded-full bg-primary/25 blur-3xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-full flex-col justify-between p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-fit rounded-full border border-hairline bg-background/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: p.role }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl sm:text-4xl leading-none", children: p.title.split(/ [—–-] /)[0] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 flex flex-wrap gap-1.5", children: p.stack.slice(0, 3).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-background/70 px-2 py-0.5 text-[11px] text-muted-foreground", children: s }, s)) })
      ] })
    ] })
  ] }) });
}
function StatusBadge({
  status
}) {
  if (!status) return null;
  const live = status === "Live";
  const building = status === "In development" || status === "Prototype";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${live ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : building ? "bg-amber-500/15 text-amber-700 dark:text-amber-300" : "bg-surface-2 text-muted-foreground"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `size-1.5 rounded-full ${live ? "bg-emerald-500 animate-pulse" : building ? "bg-amber-500" : "bg-muted-foreground"}` }),
    status
  ] });
}
function ProjectActions({
  project: p,
  size = "md"
}) {
  const pad = size === "lg" ? "px-5 py-3" : "px-4 py-2.5";
  const outline = `inline-flex items-center gap-1.5 rounded-full border border-hairline ${pad} text-sm hover:border-primary hover:text-primary transition-colors`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
    p.link && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: p.link, target: "_blank", rel: "noreferrer", className: `inline-flex items-center gap-1.5 rounded-full bg-primary ${pad} text-sm font-medium text-primary-foreground hover:scale-[1.02] transition-transform`, children: [
      "Visit live site ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4" })
    ] }),
    p.github ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: p.github, target: "_blank", rel: "noreferrer", className: outline, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "size-4" }),
      " Code"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `${outline} cursor-default opacity-60 hover:border-hairline hover:text-current`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "size-3.5" }),
      " Private repo"
    ] }),
    p.videos?.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(DemoVideos, { project: p, trigger: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: `${outline} border-primary/50 text-primary hover:bg-primary/10`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "size-4" }),
      p.videos.length === 1 ? "Watch demo" : `Watch ${p.videos.length} demos`
    ] }) }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(CaseStudy, { project: p, trigger: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: outline, children: "Case study" }) })
  ] });
}
function DemoVideos({
  project: p,
  trigger,
  initialIndex = 0
}) {
  const videos = p.videos ?? [];
  const [active, setActive] = reactExports.useState(initialIndex);
  const current = videos[active];
  if (!current) return null;
  const landscape = current.orientation === "landscape";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { onOpenChange: (open) => open && setActive(initialIndex), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[92vh] overflow-y-auto sm:max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-2xl font-normal sm:text-3xl", children: [
          p.title.split(/ [—–-] /)[0],
          " · Demo videos"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { children: [
          active + 1,
          " of ",
          videos.length,
          " · ",
          current.title
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `grid gap-5 ${videos.length > 1 ? "md:grid-cols-[1fr_17rem]" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-w-0 items-center justify-center rounded-2xl bg-black", children: /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: current.src, poster: current.poster, controls: true, autoPlay: true, playsInline: true, preload: "metadata", className: landscape ? "aspect-video w-full rounded-2xl" : "max-h-[70vh] w-auto max-w-full rounded-2xl" }, current.src) }),
        videos.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "flex gap-2 overflow-x-auto pb-1 md:max-h-[70vh] md:flex-col md:overflow-y-auto md:overflow-x-visible md:pb-0 md:pr-1", children: videos.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "shrink-0 md:shrink", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setActive(i), "aria-current": i === active, className: `flex w-40 items-center gap-3 rounded-xl border p-2 text-left transition-colors md:w-full ${i === active ? "border-primary bg-primary/10" : "border-hairline hover:border-primary/50"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative h-14 w-10 shrink-0 overflow-hidden rounded-md bg-surface-2", children: [
            v.poster && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: v.poster, alt: "", loading: "lazy", className: "size-full object-cover" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "absolute inset-0 m-auto size-5 text-white drop-shadow" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "line-clamp-2 text-xs leading-snug", children: v.title })
        ] }) }, v.src)) })
      ] })
    ] })
  ] });
}
function DemoStrip({
  project: p
}) {
  const videos = p.videos ?? [];
  if (!videos.length) return null;
  const shown = videos.slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 font-mono text-[10px] uppercase tracking-widest text-primary", children: videos.length === 1 ? "Demo video" : `${videos.length} demo videos` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      shown.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(DemoVideos, { project: p, initialIndex: i, trigger: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", "aria-label": `Play ${v.title}`, className: "group/v relative h-24 w-16 shrink-0 overflow-hidden rounded-xl border border-hairline bg-surface-2 hover:border-primary", children: [
        v.poster && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: v.poster, alt: "", loading: "lazy", className: "size-full object-cover transition-transform duration-500 group-hover/v:scale-110" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 grid place-items-center bg-black/25 group-hover/v:bg-black/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "size-6 text-white drop-shadow" }) })
      ] }) }, v.src)),
      videos.length > shown.length && /* @__PURE__ */ jsxRuntimeExports.jsx(DemoVideos, { project: p, initialIndex: shown.length, trigger: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", className: "grid h-24 w-16 shrink-0 place-items-center rounded-xl border border-hairline text-sm text-muted-foreground hover:border-primary hover:text-primary", children: [
        "+",
        videos.length - shown.length
      ] }) })
    ] })
  ] });
}
function CaseStudy({
  project: p,
  trigger
}) {
  const rows = [{
    label: "The problem",
    value: p.problem
  }, {
    label: "The challenge",
    value: p.challenge
  }, {
    label: "The result",
    value: p.result
  }].filter((r) => r.value);
  const img = resolvePortfolioImage(p.image);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-h-[88vh] overflow-y-auto sm:max-w-2xl", children: [
      img && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: "", className: "w-full rounded-xl border border-hairline aspect-[16/9] object-cover object-top" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: p.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: p.year })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-3xl font-normal", children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: p.role })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "space-y-5 text-sm", children: rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "mb-1.5 font-mono text-[11px] uppercase tracking-widest text-primary", children: r.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "leading-relaxed text-muted-foreground", children: r.value })
      ] }, r.label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: p.stack.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-hairline px-2.5 py-1 text-xs", children: s }, s)) }),
      p.link && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: p.link, target: "_blank", rel: "noreferrer", className: "inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground", children: [
        "Visit ",
        hostOf(p.link),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4" })
      ] })
    ] })
  ] });
}
function Projects({
  projects
}) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const filters = reactExports.useMemo(() => {
    const statuses = Array.from(new Set(rest.map((p) => p.status).filter(Boolean)));
    return ["All", ...statuses];
  }, [rest]);
  const [filter, setFilter] = reactExports.useState("All");
  const shown = filter === "All" ? rest : rest.filter((p) => p.status === filter);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "work", className: "scroll-mt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-24 sm:py-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { kicker: "04 · Selected work", title: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "Real products. Real users. ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-primary", children: "Shipped." })
    ] }), children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-muted-foreground", children: "Marketplaces, fintech, school SaaS, and e-commerce — each with a live link or code, the stack, and a full case study." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-20 sm:space-y-24", children: featured.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.article, { ...fadeUp, className: "group grid min-w-0 lg:grid-cols-12 gap-8 lg:gap-12 items-center [&>*]:min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: p.link || void 0, target: "_blank", rel: "noreferrer", className: `lg:col-span-7 block ${i % 2 === 1 ? "lg:order-2" : ""}`, "aria-label": `${p.title} live site`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectVisual, { project: p }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `lg:col-span-5 space-y-5 ${i % 2 === 1 ? "lg:order-1" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-primary", children: String(i + 1).padStart(2, "0") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: p.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: [
            p.role,
            " · ",
            p.year
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl sm:text-4xl leading-tight", children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: p.description }),
        p.result && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "rounded-2xl border border-hairline bg-surface/60 p-4 text-sm leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-primary block mb-1", children: "Outcome" }),
          p.result
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: p.stack.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-hairline px-2.5 py-1 text-xs", children: s }, s)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DemoStrip, { project: p }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectActions, { project: p, size: "lg" })
      ] })
    ] }, p.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-24 sm:mt-28", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl", children: "More products I've built" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", role: "tablist", "aria-label": "Filter projects", children: filters.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", role: "tab", "aria-selected": filter === f, onClick: () => setFilter(f), className: `rounded-full px-4 py-1.5 text-sm transition-colors ${filter === f ? "bg-foreground text-background" : "border border-hairline text-muted-foreground hover:text-foreground"}`, children: f }, f)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: shown.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectCard, { project: p, index: i }, p.id)) })
    ] })
  ] });
}
function ProjectCard({
  project: p,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.article, { initial: {
    opacity: 0,
    y: 16
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true,
    margin: "-60px"
  }, transition: {
    duration: 0.45,
    delay: index % 3 * 0.06
  }, className: "group lift flex min-w-0 flex-col rounded-3xl border border-hairline bg-surface/50 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectVisual, { project: p }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col gap-3 px-2 pb-2 pt-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: p.status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: p.year })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-lg font-semibold leading-snug", children: p.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground line-clamp-3", children: p.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: p.stack.slice(0, 4).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-surface-2 px-2.5 py-0.5 text-[11px]", children: s }, s)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProjectActions, { project: p }) })
    ] })
  ] });
}
function Experience({
  experience
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "experience", className: "scroll-mt-16 border-t border-hairline bg-surface/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-24 sm:py-28 grid lg:grid-cols-12 gap-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:sticky lg:top-28", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { kicker: "05 · Experience", title: "Where I've shipped, tested, and led.", className: "mb-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "From co-founding a software studio to hardening releases at an AI company — I've worked on both sides of the product." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "lg:col-span-8 relative border-l border-hairline ml-3 space-y-8", children: experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.li, { initial: {
      opacity: 0,
      x: 12
    }, whileInView: {
      opacity: 1,
      x: 0
    }, viewport: {
      once: true,
      margin: "-60px"
    }, transition: {
      duration: 0.5,
      delay: i * 0.04
    }, className: "pl-8 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute -left-[7px] top-6 size-3 rounded-full ${i === 0 ? "bg-primary shadow-glow" : "bg-muted-foreground/60"}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lift rounded-2xl border border-hairline bg-background p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl", children: e.role }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: e.period })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary text-sm mb-4 inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "size-3.5" }),
          " ",
          e.company,
          " · ",
          e.location
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 text-muted-foreground", children: e.bullets.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2.5 size-1 rounded-full bg-primary shrink-0" }),
          b
        ] }, b)) })
      ] })
    ] }, e.company + e.role)) })
  ] }) });
}
function Education({
  education
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "credentials", className: "scroll-mt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHead, { kicker: "06 · Education", title: "Two degrees. One lens on technology and people." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-3 gap-5", children: education.map((ed, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 14
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      duration: 0.45,
      delay: i * 0.06
    }, className: `lift rounded-2xl border p-6 ${i === 0 ? "border-primary/50 bg-primary/5" : "border-hairline bg-surface/40"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "size-5 text-primary" }),
        i === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-primary-foreground", children: "Latest" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: ed.period }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl mt-1 mb-1", children: ed.degree }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: ed.school }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-3", children: ed.note })
    ] }, ed.degree)) })
  ] });
}
function certImageSrc(certificate) {
  return resolvePortfolioImage(certificate.image);
}
function Certificates({
  certificates
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "certificates", className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-20 sm:py-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, className: "mb-8 flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl", children: "Degrees & certificates" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs uppercase tracking-widest text-muted-foreground", children: [
        certificates.length,
        " credentials · tap to view"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: certificates.map((c, i) => {
      const src = certImageSrc(c);
      const open = c.file || src;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 12
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.4,
        delay: i % 3 * 0.05
      }, className: "group lift rounded-2xl border border-hairline bg-background overflow-hidden hover:border-primary/60", children: [
        src && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: src, onClick: (e) => openStaticAsset(src, e), className: "block cursor-pointer border-b border-hairline bg-surface-2 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: c.title, loading: "lazy", className: "w-full aspect-[16/10] object-cover object-top group-hover:scale-[1.03] transition-transform duration-500" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex items-start gap-3", children: [
          !src && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "size-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: c.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-medium leading-snug", children: c.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: c.issuer }),
            open && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: open, onClick: (e) => openStaticAsset(open, e), className: "text-primary text-xs mt-2 inline-flex items-center gap-1 hover:underline", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-3" }),
              " ",
              c.file ? "View PDF" : "View certificate",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-3" })
            ] })
          ] })
        ] })
      ] }, c.id);
    }) })
  ] });
}
function Contact({
  profile
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "contact", className: "relative scroll-mt-16 border-t border-hairline overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-glow pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-grid pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-24 sm:py-32 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { ...fadeUp, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-primary mb-4", children: "07 · Let's build" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] max-w-4xl", children: [
          "Got a hard problem? ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-gradient", children: "Bring it." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-muted-foreground text-lg max-w-2xl", children: "Tell me what you're building — I'll tell you honestly how I'd approach it, and what it would take." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid lg:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.a, { ...fadeUp, href: hireHref(profile), className: "group lift relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-6 mb-8" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest opacity-80", children: "Hiring an engineer?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-3xl sm:text-4xl leading-tight", children: "Remote roles & contract builds" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-md opacity-85", children: "Full-stack, QA, or product engineering — I can contribute from day one." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-8 inline-flex items-center gap-2 font-medium", children: [
            "Email me",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4 group-hover:translate-x-1 transition-transform" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.a, { ...fadeUp, href: `${companyUrl(profile).replace(/\/$/, "")}/contact`, target: "_blank", rel: "noreferrer", className: "group lift relative overflow-hidden rounded-3xl bg-[#07090c] p-8 text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: zentrixIcon, alt: "", className: "size-10 rounded-xl mb-6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-widest text-[#00e08a]", children: "Need a product built?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-3xl sm:text-4xl leading-tight", children: "Hire my team at Zentrix" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-md text-white/70", children: "Web, mobile, cloud, and AI — scoped, priced, and delivered end to end." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-8 inline-flex items-center gap-2 font-medium text-[#00e08a]", children: [
            "Start a project",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid sm:grid-cols-2 lg:grid-cols-5 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactCard, { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactCard, { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactCard, { icon: Linkedin, label: "LinkedIn", value: "ugochukwuhenry", href: profile.linkedin }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactCard, { icon: Github, label: "GitHub", value: "ugochukwu16henry", href: profile.github }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactCard, { icon: FileText, label: "Resume", value: "Download PDF", href: resumePdf, download: resumeDownloadName })
      ] })
    ] })
  ] });
}
function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  download
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href, target: "_blank", rel: "noreferrer", download, className: "group rounded-2xl border border-hairline bg-surface/60 p-5 hover:border-primary hover:bg-surface transition-colors block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4 text-primary mb-3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm break-all group-hover:text-primary transition-colors", children: value })
  ] });
}
function Footer({
  profile
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-hairline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs uppercase tracking-widest", children: [
      "© 2026 ",
      profile.name
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: companyUrl(profile), target: "_blank", rel: "noreferrer", className: "font-mono text-xs uppercase tracking-widest hover:text-primary transition-colors", children: "Co-Founder · Zentrix" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResumeLink, { className: "font-mono text-xs uppercase tracking-widest hover:text-primary transition-colors", children: "Download resume" })
    ] })
  ] }) });
}
function FloatingHire({
  profile
}) {
  const [show, setShow] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.a, { href: hireHref(profile), initial: false, animate: {
    opacity: show ? 1 : 0,
    y: show ? 0 : 16,
    pointerEvents: show ? "auto" : "none"
  }, transition: {
    duration: 0.3
  }, className: "fixed bottom-20 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-glow", "aria-hidden": !show, tabIndex: show ? 0 : -1, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4" }),
    " Work with me"
  ] });
}
export {
  Home as component
};
