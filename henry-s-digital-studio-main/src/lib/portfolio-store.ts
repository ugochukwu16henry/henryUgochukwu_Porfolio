import seed from "@/data/portfolio.json";

export type Project = {
  id: string;
  title: string;
  year: string;
  role: string;
  stack: string[];
  /** Short summary; STAR fields carry the deep-dive on the home page. */
  description: string;
  problem: string;
  challenge: string;
  result: string;
  image?: string;
  link?: string;
  github?: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
};

export type Education = {
  school: string;
  degree: string;
  period: string;
  note: string;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image?: string;
  file?: string;
};

export type Profile = typeof seed.profile;
export type Skills = typeof seed.skills;

export type Portfolio = {
  profile: Profile;
  skills: Skills;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certificates: Certificate[];
};

const KEY = "henry-portfolio:v2";

function mergeProjects(seedProjects: Project[], storedProjects: Project[] | undefined): Project[] {
  if (!storedProjects?.length) return seedProjects;

  const storedById = new Map(storedProjects.map((project) => [project.id, project]));

  const merged = seedProjects.map((seedProject) => {
    const stored = storedById.get(seedProject.id);
    if (!stored) return seedProject;

    return {
      ...seedProject,
      ...stored,
      image: stored.image?.trim() ? stored.image : seedProject.image,
      link: stored.link?.trim() ? stored.link : seedProject.link,
      github: stored.github?.trim() ? stored.github : seedProject.github,
      problem: stored.problem?.trim() ? stored.problem : seedProject.problem,
      challenge: stored.challenge?.trim() ? stored.challenge : seedProject.challenge,
      result: stored.result?.trim() ? stored.result : seedProject.result,
    };
  });

  const extras = storedProjects.filter(
    (stored) => !seedProjects.some((seedProject) => seedProject.id === stored.id),
  );

  return [...merged, ...extras];
}

function mergeCertificates(
  seedCertificates: Certificate[],
  storedCertificates: Certificate[] | undefined,
): Certificate[] {
  if (!storedCertificates?.length) return seedCertificates;

  const storedById = new Map(storedCertificates.map((certificate) => [certificate.id, certificate]));

  const merged = seedCertificates.map((seedCertificate) => {
    const stored = storedById.get(seedCertificate.id);
    if (!stored) return seedCertificate;

    return {
      ...seedCertificate,
      ...stored,
      // Keep new seed image/file when old local data has empty values.
      image: stored.image && stored.image.trim() ? stored.image : seedCertificate.image,
      file: stored.file && stored.file.trim() ? stored.file : seedCertificate.file,
    };
  });

  const extras = storedCertificates.filter(
    (stored) => !seedCertificates.some((seedCertificate) => seedCertificate.id === stored.id),
  );

  return [...merged, ...extras];
}

/** Reconcile GitHub/local edits with bundled seed (keeps image keys, STAR fields, etc.). */
export function mergeWithSeed(partial: Partial<Portfolio>): Portfolio {
  const base = seed as Portfolio;
  return {
    ...base,
    ...partial,
    projects: mergeProjects(base.projects, partial.projects),
    certificates: mergeCertificates(base.certificates, partial.certificates),
  };
}

export function loadPortfolio(): Portfolio {
  if (typeof window === "undefined") return seed as Portfolio;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed as Portfolio;
    const parsed = JSON.parse(raw) as Partial<Portfolio>;
    const base = seed as Portfolio;

    return mergeWithSeed(parsed);
  } catch {
    return seed as Portfolio;
  }
}

export function savePortfolio(p: Portfolio) {
  localStorage.setItem(KEY, JSON.stringify(p));
}

export function resetStore() {
  localStorage.removeItem(KEY);
}

export function exportJson(): string {
  return JSON.stringify(loadPortfolio(), null, 2);
}
