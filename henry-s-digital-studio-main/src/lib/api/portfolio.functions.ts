import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import seed from "@/data/portfolio.json";
import type { Portfolio } from "@/lib/portfolio-store";

const portfolioSchema = z.object({
  profile: z.any(),
  skills: z.any(),
  projects: z.array(z.any()),
  experience: z.array(z.any()),
  education: z.array(z.any()),
  certificates: z.array(z.any()),
});

export const getLivePortfolio = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { loadPortfolioFromGithub } = await import("@/lib/github-portfolio.server");
    const portfolio = await loadPortfolioFromGithub();
    return { ok: true, source: "github" as const, portfolio };
  } catch (error) {
    console.error(error);
    return { ok: true, source: "local" as const, portfolio: seed as Portfolio };
  }
});

export const saveLivePortfolio = createServerFn({ method: "POST" })
  .inputValidator(portfolioSchema)
  .handler(async ({ data }) => {
    const { savePortfolioToGithub } = await import("@/lib/github-portfolio.server");
    const portfolio = data as Portfolio;
    const result = await savePortfolioToGithub(portfolio);
    return { ok: true, ...result };
  });
