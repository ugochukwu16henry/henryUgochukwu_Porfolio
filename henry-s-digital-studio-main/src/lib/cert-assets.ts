/**
 * Portfolio images are served from /public so Vercel serves them as static files
 * (stable URLs, no SPA 404s, no dependency on Vite hashed /assets/ paths).
 */
export const certificateAssets: Record<string, string> = {
  "bs-software-development": "/certificates/bs-software-development.png",
  "byui-degree": "/certificates/byui-degree.png",
  "aas-software-development": "/certificates/aas-software-development.png",
  "web-and-computer-programming-certificate": "/certificates/web-and-computer-programming.png",
  "web-development-certificate": "/certificates/web-development.png",
};

export const projectAssets: Record<string, string> = {
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
  "project-mummyj2": "/images/projects/project-mummyj2.png",
};

export const imageAssets: Record<string, string> = {
  ...certificateAssets,
  ...projectAssets,
};

export const portraitImage = "/images/henry-profile.jpeg";
export const zentrixIcon = "/images/zentrix-icon.png";

/** Primary resume URL (also kept at legacy path for old links). */
export const resumePdf = "/resume/henry-ugochukwu-resume-2026.pdf";
export const resumePdfLegacy = "/HenryUgochukwu_resumeMay2026.pdf";

export function hasPortfolioImageKey(key: string | undefined): boolean {
  if (!key?.trim()) return false;
  return key.trim() in imageAssets;
}

export function resolvePortfolioImage(key: string | undefined): string | undefined {
  if (!key?.trim()) return undefined;
  return imageAssets[key.trim()];
}
