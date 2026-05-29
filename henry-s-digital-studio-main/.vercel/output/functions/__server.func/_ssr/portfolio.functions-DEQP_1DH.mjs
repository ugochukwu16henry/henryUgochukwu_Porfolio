import { s as seed } from "./portfolio-BMxTfVw5.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-WXc0ypUF.mjs";
import { o as objectType, a as arrayType, b as anyType } from "../_libs/zod.mjs";
const certificateAssets = {
  "byui-degree": "/certificates/byui-degree.png",
  "aas-software-development": "/certificates/aas-software-development.png",
  "web-and-computer-programming-certificate": "/certificates/web-and-computer-programming.png",
  "web-development-certificate": "/certificates/web-development.png"
};
const projectAssets = {
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
function hasPortfolioImageKey(key) {
  if (!key?.trim()) return false;
  return key.trim() in imageAssets;
}
function resolvePortfolioImage(key) {
  if (!key?.trim()) return void 0;
  return imageAssets[key.trim()];
}
const KEY = "henry-portfolio:v2";
function mergeProjects(seedProjects, storedProjects) {
  if (!storedProjects?.length) return seedProjects;
  const storedById = new Map(storedProjects.map((project) => [project.id, project]));
  const merged = seedProjects.map((seedProject) => {
    const stored = storedById.get(seedProject.id);
    if (!stored) return seedProject;
    return {
      ...seedProject,
      ...stored,
      image: stored.image?.trim() && hasPortfolioImageKey(stored.image) ? stored.image.trim() : seedProject.image,
      link: stored.link?.trim() ? stored.link : seedProject.link,
      github: stored.github?.trim() ? stored.github : seedProject.github,
      problem: stored.problem?.trim() ? stored.problem : seedProject.problem,
      challenge: stored.challenge?.trim() ? stored.challenge : seedProject.challenge,
      result: stored.result?.trim() ? stored.result : seedProject.result
    };
  });
  const extras = storedProjects.filter(
    (stored) => !seedProjects.some((seedProject) => seedProject.id === stored.id)
  );
  return [...merged, ...extras];
}
function mergeCertificates(seedCertificates, storedCertificates) {
  if (!storedCertificates?.length) return seedCertificates;
  const storedById = new Map(storedCertificates.map((certificate) => [certificate.id, certificate]));
  const merged = seedCertificates.map((seedCertificate) => {
    const stored = storedById.get(seedCertificate.id);
    if (!stored) return seedCertificate;
    return {
      ...seedCertificate,
      ...stored,
      // Keep new seed image/file when old local data has empty values.
      image: stored.image?.trim() && hasPortfolioImageKey(stored.image) ? stored.image.trim() : seedCertificate.image,
      file: stored.file && stored.file.trim() ? stored.file : seedCertificate.file
    };
  });
  const extras = storedCertificates.filter(
    (stored) => !seedCertificates.some((seedCertificate) => seedCertificate.id === stored.id)
  );
  return [...merged, ...extras];
}
function mergeWithSeed(partial) {
  const base = seed;
  return {
    ...base,
    ...partial,
    projects: mergeProjects(base.projects, partial.projects),
    certificates: mergeCertificates(base.certificates, partial.certificates)
  };
}
function loadPortfolio() {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed;
    const parsed = JSON.parse(raw);
    const base = seed;
    return mergeWithSeed(parsed);
  } catch {
    return seed;
  }
}
function savePortfolio(p) {
  localStorage.setItem(KEY, JSON.stringify(p));
}
function resetStore() {
  localStorage.removeItem(KEY);
}
function exportJson() {
  return JSON.stringify(loadPortfolio(), null, 2);
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const portfolioSchema = objectType({
  profile: anyType(),
  skills: anyType(),
  projects: arrayType(anyType()),
  experience: arrayType(anyType()),
  education: arrayType(anyType()),
  certificates: arrayType(anyType())
});
const getLivePortfolio = createServerFn({
  method: "GET"
}).handler(createSsrRpc("7abefc919ff69cbf99252c20598241414d8450bfa308a740b01b002d762a0c38"));
const saveLivePortfolio = createServerFn({
  method: "POST"
}).inputValidator(portfolioSchema).handler(createSsrRpc("1215845bd484752425ae7a8c6700e00e8d68881d0b929bb098c8d0cbf0ea770d"));
export {
  saveLivePortfolio as a,
  resolvePortfolioImage as b,
  exportJson as e,
  getLivePortfolio as g,
  loadPortfolio as l,
  mergeWithSeed as m,
  portraitImage as p,
  resetStore as r,
  savePortfolio as s
};
