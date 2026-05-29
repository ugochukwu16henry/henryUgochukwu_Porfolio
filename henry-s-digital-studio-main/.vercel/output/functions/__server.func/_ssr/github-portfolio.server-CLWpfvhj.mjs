import { s as seed } from "./portfolio-BGiy4pfb.mjs";
import process from "node:process";
function getServerConfig() {
  return {
    nodeEnv: process.env.NODE_ENV,
    githubToken: process.env.GITHUB_TOKEN,
    githubOwner: process.env.GITHUB_OWNER,
    githubRepo: process.env.GITHUB_REPO,
    githubBranch: process.env.GITHUB_BRANCH ?? "main",
    githubPortfolioPath: process.env.GITHUB_PORTFOLIO_PATH ?? "src/data/portfolio.json"
  };
}
function toGithubContentApiUrl(owner, repo, path, branch) {
  const encodedPath = path.split("/").map((segment) => encodeURIComponent(segment)).join("/");
  return `https://api.github.com/repos/${owner}/${repo}/contents/${encodedPath}?ref=${encodeURIComponent(branch)}`;
}
function getRequiredGithubConfig() {
  const config = getServerConfig();
  if (!config.githubOwner || !config.githubRepo) {
    throw new Error("Missing GitHub repository config. Set GITHUB_OWNER and GITHUB_REPO.");
  }
  return config;
}
function decodeBase64Json(base64) {
  const normalized = base64.replace(/\n/g, "");
  const text = Buffer.from(normalized, "base64").toString("utf-8");
  return JSON.parse(text);
}
function encodeJsonBase64(value) {
  const text = JSON.stringify(value, null, 2);
  return Buffer.from(text, "utf-8").toString("base64");
}
async function githubGetFile(token) {
  const config = getRequiredGithubConfig();
  const url = toGithubContentApiUrl(
    config.githubOwner,
    config.githubRepo,
    config.githubPortfolioPath,
    config.githubBranch
  );
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      ...token ? { Authorization: `Bearer ${token}` } : {},
      "X-GitHub-Api-Version": "2022-11-28"
    }
  });
  if (!response.ok) {
    throw new Error(`GitHub read failed (${response.status}): ${await response.text()}`);
  }
  return await response.json();
}
async function loadPortfolioFromGithub() {
  const config = getRequiredGithubConfig();
  try {
    const file = await githubGetFile(config.githubToken);
    return decodeBase64Json(file.content);
  } catch (error) {
    console.error("GitHub portfolio read failed; falling back to local seed.", error);
    return seed;
  }
}
async function savePortfolioToGithub(data) {
  const config = getRequiredGithubConfig();
  if (!config.githubToken) {
    throw new Error("Missing GITHUB_TOKEN. Cannot write portfolio JSON to GitHub.");
  }
  const current = await githubGetFile(config.githubToken);
  const url = toGithubContentApiUrl(
    config.githubOwner,
    config.githubRepo,
    config.githubPortfolioPath,
    config.githubBranch
  );
  const body = {
    message: "chore: update live portfolio data",
    content: encodeJsonBase64(data),
    sha: current.sha,
    branch: config.githubBranch
  };
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${config.githubToken}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    throw new Error(`GitHub write failed (${response.status}): ${await response.text()}`);
  }
  const json = await response.json();
  return { commitSha: json.commit?.sha ?? "" };
}
export {
  loadPortfolioFromGithub,
  savePortfolioToGithub
};
