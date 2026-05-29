# Vercel Deployment + GitHub Live JSON

This app is **TanStack Start + Vite + Nitro** (not Next.js). Use the settings below in the Vercel dashboard.

## 1. Import & Root Directory

1. Import [henryUgochukwu_Porfolio](https://github.com/ugochukwu16henry/henryUgochukwu_Porfolio) in Vercel.
2. **Root Directory:** `henry-s-digital-studio-main`  
   (Do **not** use `frontend` — that folder does not exist in this repo.)
3. Click **Continue** — Vercel will read `henry-s-digital-studio-main/vercel.json`.

## 2. Framework Settings (override defaults)

In **Project → Settings → Build & Deployment → Framework Settings**, set:

| Setting | Value |
| --- | --- |
| **Framework Preset** | **Other** (not Next.js) |
| **Root Directory** | `henry-s-digital-studio-main` |
| **Build Command** | `bun run build` |
| **Install Command** | `bun install` |
| **Development Command** | `bun run dev` |
| **Output Directory** | *(leave empty)* — Nitro writes `.vercel/output` automatically |

**Include files outside the root directory:** Off (not needed).

**Ignored Build Step:** Automatic (default) is fine.

**Node.js Version:** `22.x` (or `20.x`). `24.x` usually works; use 22.x if a build fails.

`NITRO_PRESET=vercel` is set in `vercel.json` — do not remove it.

### Wrong settings (will fail)

- Framework Preset: **Next.js** with `next build` / `pnpm install`
- Root Directory: **`frontend`**

## 3. Environment variables

**Project Settings → Environment Variables** (Production, Preview, Development):

Use values from `.env.example`:

| Variable | Example / notes |
| --- | --- |
| `GITHUB_TOKEN` | Fine-grained PAT with **Contents: Read and write** |
| `GITHUB_OWNER` | `ugochukwu16henry` |
| `GITHUB_REPO` | `henryUgochukwu_Porfolio` |
| `GITHUB_BRANCH` | `main` |
| `GITHUB_PORTFOLIO_PATH` | `henry-s-digital-studio-main/src/data/portfolio.json` |

Required for link previews (WhatsApp, LinkedIn, iMessage) and SEO:

| Variable | Purpose |
| --- | --- |
| `VITE_APP_URL` | Production URL with no trailing slash (e.g. `https://your-domain.vercel.app`). Used for `og:image`, canonical URLs, and JSON-LD. |

Without `VITE_APP_URL`, share cards may use a fallback domain and the wrong preview image URL.

Never commit real tokens to git.

## 4. GitHub token permissions

Create a fine-grained PAT with repository access for the target repo:

- **Contents:** Read and write

## 5. How live storage works

- Home page loads portfolio JSON from GitHub via server function.
- Dashboard loads GitHub data first (merged with seed).
- Dashboard **Save** commits updated JSON to `GITHUB_PORTFOLIO_PATH`.
- If GitHub read/write fails, the app falls back to seed / local storage.

## 6. Deploy

Push to `main`. Vercel builds and deploys automatically.

**Redeploy** after changing env vars or framework settings.

## 7. Verify build locally (optional)

```bash
cd henry-s-digital-studio-main
bun install
bun run build
```

A successful build produces `.vercel/output/` (used by Vercel).
