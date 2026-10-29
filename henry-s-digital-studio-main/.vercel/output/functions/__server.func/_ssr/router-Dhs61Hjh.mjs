import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { s as seed } from "./portfolio-CGQBLrmy.mjs";
import { S as Sun, M as Moon } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const THEME_STORAGE_KEY = "henry-portfolio:theme";
const ThemeContext = reactExports.createContext(null);
function applyTheme(theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}
function getThemeFromDocument() {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}
function ThemeProvider({ children }) {
  const [stored, setThemeState] = reactExports.useState(null);
  const theme = stored ?? "light";
  reactExports.useEffect(() => {
    setThemeState(getThemeFromDocument());
  }, []);
  reactExports.useEffect(() => {
    if (!stored) return;
    applyTheme(stored);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, stored);
    } catch {
    }
  }, [stored]);
  const setTheme = reactExports.useCallback((next) => {
    setThemeState(next);
  }, []);
  const toggleTheme = reactExports.useCallback(() => {
    setThemeState(
      (current) => (current ?? getThemeFromDocument()) === "dark" ? "light" : "dark"
    );
  }, []);
  const value = reactExports.useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeContext.Provider, { value, children });
}
function useTheme() {
  const context = reactExports.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
function ThemeToggle({ variant = "floating" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const className = variant === "floating" ? "fixed bottom-5 right-5 z-[70] inline-flex items-center gap-2 rounded-full border border-hairline bg-background/90 px-3 py-2 text-xs font-mono uppercase tracking-widest text-foreground shadow-elegant backdrop-blur-md transition hover:border-primary hover:text-primary" : "inline-flex items-center gap-2 rounded-full border border-hairline bg-background/80 px-3 py-1.5 text-xs font-mono uppercase tracking-widest text-foreground transition hover:border-primary hover:text-primary";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "aria-label": isDark ? "Switch to day mode" : "Switch to night mode",
      onClick: toggleTheme,
      className,
      children: [
        isDark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "size-4" }),
        isDark ? "Day" : "Night"
      ]
    }
  );
}
function ThemeInitScript() {
  const code = `(() => {
  try {
    const key = "${THEME_STORAGE_KEY}";
    const stored = localStorage.getItem(key);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored === "light" || stored === "dark" ? stored : (prefersDark ? "dark" : "light");
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
  } catch {}
})();`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("script", { dangerouslySetInnerHTML: { __html: code } });
}
const certificateAssets = {
  "bs-software-development": "/certificates/bs-software-development.png",
  "byui-degree": "/certificates/byui-degree.png",
  "aas-software-development": "/certificates/aas-software-development.png",
  "web-and-computer-programming-certificate": "/certificates/web-and-computer-programming.png",
  "web-development-certificate": "/certificates/web-development.png"
};
const projectAssets = {
  "zentrix-market": "/images/projects/zentrix-market.png",
  "zentrix-website": "/images/projects/zentrix-website.png",
  peni: "/images/projects/peni.jpg",
  "zentrix-ai-hub": "/images/projects/zentrix-ai-hub.jpg",
  "marketplace-connect": "/images/projects/marketplace-connect.jpg",
  linksphere: "/images/projects/linksphere.jpg",
  henrymo: "/images/projects/henrymo.jpg",
  gpg: "/images/projects/gpg.png",
  mega: "/images/projects/mega.png",
  "e-book": "/images/projects/e-book.png",
  riseflowschool: "/images/projects/riseflowschool.png",
  "project-riseflow": "/images/projects/project-riseflow.png",
  "project-mummyj2": "/images/projects/project-mummyj2.png"
};
const imageAssets = {
  ...certificateAssets,
  ...projectAssets
};
const portraitImage = "/images/henry-profile.jpeg";
const zentrixIcon = "/images/zentrix-icon.png";
const shareCardImage = "/images/og-card.jpg";
const resumePdf = "/resume/henry-ugochukwu-resume-2026.pdf";
function hasPortfolioImageKey(key) {
  if (!key?.trim()) return false;
  return key.trim() in imageAssets;
}
function resolvePortfolioImage(key) {
  if (!key?.trim()) return void 0;
  return imageAssets[key.trim()];
}
const FALLBACK_SITE_URL = "https://henry-ugochukwu-porfolio.vercel.app";
function getSiteUrl() {
  return FALLBACK_SITE_URL;
}
function absoluteUrl(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}
function trimDescription(text, max = 300) {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}
function buildPersonJsonLd(profile, pageUrl) {
  const image = absoluteUrl(portraitImage);
  const title = `${profile.name} — ${profile.title}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${pageUrl}#person`,
        name: profile.fullName,
        alternateName: profile.name,
        url: pageUrl,
        image: {
          "@type": "ImageObject",
          url: image,
          contentUrl: image,
          caption: `${profile.name} — ${profile.title}`
        },
        email: `mailto:${profile.email}`,
        jobTitle: profile.title,
        description: profile.summary,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Uyo",
          addressRegion: "Akwa Ibom State",
          addressCountry: "NG"
        },
        sameAs: [profile.linkedin, profile.github].filter(Boolean),
        worksFor: {
          "@type": "Organization",
          name: profile.company,
          url: profile.companyUrl
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Brigham Young University-Idaho"
        },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: "Bachelor of Science in Software Development"
        },
        knowsAbout: [
          "Full-stack web development",
          "React",
          "Next.js",
          "Node.js",
          "TypeScript",
          "PostgreSQL",
          "Software testing",
          "Remote collaboration"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${pageUrl}#website`,
        url: pageUrl,
        name: `${profile.name} — Portfolio`,
        description: profile.tagline,
        publisher: { "@id": `${pageUrl}#person` },
        inLanguage: "en-US"
      },
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description: profile.summary,
        isPartOf: { "@id": `${pageUrl}#website` },
        about: { "@id": `${pageUrl}#person` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: image
        }
      }
    ]
  };
}
function buildPortfolioHead(options) {
  const profile = options?.profile ?? seed.profile;
  const path = options?.path ?? "/";
  const pageUrl = absoluteUrl(path);
  const title = `${profile.name} — ${profile.title}`;
  const description = trimDescription(
    `${profile.tagline} ${profile.summary}`.replace(/\s+/g, " ").trim()
  );
  const image = absoluteUrl(shareCardImage);
  const resume = absoluteUrl(resumePdf);
  const meta = [
    { title },
    { name: "description", content: description },
    { name: "author", content: profile.name },
    {
      name: "keywords",
      content: "Henry Ugochukwu, software engineer, full-stack developer, Zentrix Software Solutions, co-founder, B.S. Software Development, React, Next.js, NestJS, Node.js, TypeScript, PostgreSQL, remote developer, portfolio, BYU-Idaho, Nigeria"
    },
    { name: "robots", content: "index, follow, max-image-preview:large" },
    { name: "googlebot", content: "index, follow, max-image-preview:large" },
    { name: "application-name", content: `${profile.name} Portfolio` },
    { name: "theme-color", content: "#14110f" },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: `${profile.name} Portfolio` },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: pageUrl },
    { property: "og:locale", content: "en_US" },
    { property: "og:image", content: image },
    { property: "og:image:secure_url", content: image },
    { property: "og:image:alt", content: `${profile.name} — ${profile.title}` },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "profile:first_name", content: "Henry" },
    { property: "profile:last_name", content: "Ugochukwu" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: `${profile.name} — ${profile.title}` }
  ];
  const links = [
    { rel: "canonical", href: pageUrl },
    { rel: "alternate", href: resume, type: "application/pdf", title: "Resume (PDF)" },
    { rel: "me", href: profile.github }
  ];
  const scripts = [
    {
      type: "application/ld+json",
      children: JSON.stringify(buildPersonJsonLd(profile, pageUrl))
    }
  ];
  return { meta, links, scripts };
}
const appCss = "/assets/styles-CCIihK2w.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const fontsCss = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
const Route$2 = createRootRouteWithContext()({
  head: () => {
    const seo = buildPortfolioHead();
    return {
      meta: [{ charSet: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, ...seo.meta],
      links: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        { rel: "stylesheet", href: fontsCss },
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        ...seo.links
      ],
      scripts: seo.scripts
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return (
    // ThemeInitScript sets the theme class on <html> before hydration.
    /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", suppressHydrationWarning: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeInitScript, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
      ] })
    ] })
  );
}
function RootComponent() {
  const { queryClient } = Route$2.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {})
  ] }) });
}
const $$splitComponentImporter$1 = () => import("./dashboard-gUJ3DvjC.mjs");
const Route$1 = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard · Henry Ugochukwu"
    }, {
      name: "description",
      content: "Manage portfolio content."
    }, {
      name: "robots",
      content: "noindex, nofollow, noarchive"
    }, {
      name: "googlebot",
      content: "noindex, nofollow"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-BQvWExhR.mjs");
const Route = createFileRoute("/")({
  head: () => buildPortfolioHead({
    path: "/",
    profile: seed.profile
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const DashboardRoute = Route$1.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$2
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$2
});
const rootRouteChildren = {
  IndexRoute,
  DashboardRoute
};
const routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  ThemeToggle as T,
  resumePdf as a,
  router as b,
  hasPortfolioImageKey as h,
  portraitImage as p,
  resolvePortfolioImage as r,
  useTheme as u,
  zentrixIcon as z
};
