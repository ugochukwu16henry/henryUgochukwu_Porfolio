import { s as seed } from "./portfolio-DSXK1LEK.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-ROBbq_ej.mjs";
import { o as objectType, a as arrayType, b as anyType } from "../_libs/zod.mjs";
const KEY = "henry-portfolio:v2";
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
      image: stored.image && stored.image.trim() ? stored.image : seedCertificate.image,
      file: stored.file && stored.file.trim() ? stored.file : seedCertificate.file
    };
  });
  const extras = storedCertificates.filter(
    (stored) => !seedCertificates.some((seedCertificate) => seedCertificate.id === stored.id)
  );
  return [...merged, ...extras];
}
function loadPortfolio() {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed;
    const parsed = JSON.parse(raw);
    const base = seed;
    return {
      ...base,
      ...parsed,
      certificates: mergeCertificates(base.certificates, parsed.certificates)
    };
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
  exportJson as e,
  getLivePortfolio as g,
  loadPortfolio as l,
  resetStore as r,
  savePortfolio as s
};
