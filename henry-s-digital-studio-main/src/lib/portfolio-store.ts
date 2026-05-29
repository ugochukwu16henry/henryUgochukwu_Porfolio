import seed from "@/data/portfolio.json";

export type Project = {
  id: string;
  title: string;
  year: string;
  role: string;
  stack: string[];
  description: string;
  image?: string;
  link?: string;
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

export function loadPortfolio(): Portfolio {
  if (typeof window === "undefined") return seed as Portfolio;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed as Portfolio;
    const parsed = JSON.parse(raw) as Partial<Portfolio>;
    const base = seed as Portfolio;

    return {
      ...base,
      ...parsed,
      certificates: mergeCertificates(base.certificates, parsed.certificates),
    };
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
