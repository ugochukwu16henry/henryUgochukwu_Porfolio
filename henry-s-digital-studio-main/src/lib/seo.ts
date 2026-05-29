import seed from "@/data/portfolio.json";
import { portraitImage, resumePdf } from "@/lib/cert-assets";
import type { Profile } from "@/lib/portfolio-store";

/** Set VITE_APP_URL in Vercel to your production domain (no trailing slash). */
const FALLBACK_SITE_URL = "https://henry-ugochukwu-portfolio.vercel.app";

export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_APP_URL;
  if (typeof fromEnv === "string" && fromEnv.trim()) {
    return fromEnv.trim().replace(/\/$/, "");
  }
  return FALLBACK_SITE_URL;
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

function trimDescription(text: string, max = 300): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

export function buildPersonJsonLd(profile: Profile, pageUrl: string) {
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
          caption: `${profile.name} — ${profile.title}`,
        },
        email: `mailto:${profile.email}`,
        jobTitle: profile.title,
        description: profile.summary,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Uyo",
          addressRegion: "Akwa Ibom State",
          addressCountry: "NG",
        },
        sameAs: [profile.linkedin, profile.github].filter(Boolean),
        knowsAbout: [
          "Full-stack web development",
          "React",
          "Next.js",
          "Node.js",
          "TypeScript",
          "PostgreSQL",
          "Software testing",
          "Remote collaboration",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${pageUrl}#website`,
        url: pageUrl,
        name: `${profile.name} — Portfolio`,
        description: profile.tagline,
        publisher: { "@id": `${pageUrl}#person` },
        inLanguage: "en-US",
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
          url: image,
        },
      },
    ],
  };
}

export function buildPortfolioHead(options?: { path?: string; profile?: Profile }) {
  const profile = options?.profile ?? (seed.profile as Profile);
  const path = options?.path ?? "/";
  const pageUrl = absoluteUrl(path);
  const title = `${profile.name} — ${profile.title}`;
  const description = trimDescription(
    `${profile.tagline} ${profile.summary}`.replace(/\s+/g, " ").trim(),
  );
  const image = absoluteUrl(portraitImage);
  const resume = absoluteUrl(resumePdf);

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { name: "author", content: profile.name },
    {
      name: "keywords",
      content:
        "Henry Ugochukwu, software engineer, full-stack developer, React, Next.js, Node.js, TypeScript, PostgreSQL, remote developer, portfolio, BYU-Idaho, Nigeria",
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
    { property: "profile:first_name", content: "Henry" },
    { property: "profile:last_name", content: "Ugochukwu" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: `${profile.name} — ${profile.title}` },
  ];

  const links: Array<Record<string, string>> = [
    { rel: "canonical", href: pageUrl },
    { rel: "alternate", href: resume, type: "application/pdf", title: "Resume (PDF)" },
    { rel: "me", href: profile.github },
  ];

  const scripts = [
    {
      type: "application/ld+json",
      children: JSON.stringify(buildPersonJsonLd(profile, pageUrl)),
    },
  ];

  return { meta, links, scripts };
}

export function personJsonLdScript(profile?: Profile): string {
  return JSON.stringify(buildPersonJsonLd(profile ?? (seed.profile as Profile), absoluteUrl("/")));
}
