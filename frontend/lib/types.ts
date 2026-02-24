export type Profile = {
  id: string;
  fullName: string;
  title: string;
  headline: string;
  bio: string;
  email: string;
  linkedInUrl?: string;
  githubUrl?: string;
  location?: string;
  heroImageUrl?: string;
  currentRole?: string;
  firstDegree: string;
  firstDegreeDate: string;
  secondDegree: string;
  secondDegreeEta: string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  problem: string;
  actionTaken: string;
  result: string;
  techStack: string[];
  galleryImages?: string[];
  hostingFrontend?: string;
  hostingBackend?: string;
  databaseStorage?: string;
  imageUrl: string;
  liveUrl: string;
  repoUrl?: string;
  featured: boolean;
};

export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issuedDate?: string;
  credentialUrl?: string;
  imageUrl?: string;
};

export type MediaAsset = {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description?: string;
};

export type ResumeAsset = {
  id: string;
  title: string;
  type: string;
  fileUrl?: string;
  linkUrl?: string;
  isPrimary: boolean;
};
