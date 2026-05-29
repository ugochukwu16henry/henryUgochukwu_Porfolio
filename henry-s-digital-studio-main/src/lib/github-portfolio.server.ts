import seed from "@/data/portfolio.json";
import { getServerConfig } from "@/lib/config.server";
import type { Portfolio } from "@/lib/portfolio-store";

type GithubContentResponse = {
  sha: string;
  content: string;
};

function toGithubContentApiUrl(owner: string, repo: string, path: string, branch: string) {
  const encodedPath = path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `https://api.github.com/repos/${owner}/${repo}/contents/${encodedPath}?ref=${encodeURIComponent(branch)}`;
}

function getRequiredGithubConfig() {
  const config = getServerConfig();
  if (!config.githubOwner || !config.githubRepo) {
    throw new Error("Missing GitHub repository config. Set GITHUB_OWNER and GITHUB_REPO.");
  }
  return config;
}

function decodeBase64Json<T>(base64: string): T {
  const normalized = base64.replace(/\n/g, "");
  const text = Buffer.from(normalized, "base64").toString("utf-8");
  return JSON.parse(text) as T;
}

function encodeJsonBase64(value: unknown): string {
  const text = JSON.stringify(value, null, 2);
  return Buffer.from(text, "utf-8").toString("base64");
}

async function githubGetFile(token: string | undefined): Promise<GithubContentResponse> {
  const config = getRequiredGithubConfig();
  const url = toGithubContentApiUrl(
    config.githubOwner,
    config.githubRepo,
    config.githubPortfolioPath,
    config.githubBranch,
  );

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub read failed (${response.status}): ${await response.text()}`);
  }

  return (await response.json()) as GithubContentResponse;
}

export async function loadPortfolioFromGithub(): Promise<Portfolio> {
  const config = getRequiredGithubConfig();

  try {
    const file = await githubGetFile(config.githubToken);
    return decodeBase64Json<Portfolio>(file.content);
  } catch (error) {
    console.error("GitHub portfolio read failed; falling back to local seed.", error);
    return seed as Portfolio;
  }
}

export async function savePortfolioToGithub(data: Portfolio) {
  const config = getRequiredGithubConfig();
  if (!config.githubToken) {
    throw new Error("Missing GITHUB_TOKEN. Cannot write portfolio JSON to GitHub.");
  }

  const current = await githubGetFile(config.githubToken);
  const url = toGithubContentApiUrl(
    config.githubOwner,
    config.githubRepo,
    config.githubPortfolioPath,
    config.githubBranch,
  );

  const body = {
    message: "chore: update live portfolio data",
    content: encodeJsonBase64(data),
    sha: current.sha,
    branch: config.githubBranch,
  };

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${config.githubToken}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`GitHub write failed (${response.status}): ${await response.text()}`);
  }

  const json = await response.json() as { commit?: { sha?: string } };
  return { commitSha: json.commit?.sha ?? "" };
}
