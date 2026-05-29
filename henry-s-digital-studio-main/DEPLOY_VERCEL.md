# Vercel Deployment + GitHub Live JSON

## 1. Connect project to Vercel
1. Import this repository in Vercel.
2. Set Root Directory to `henry-s-digital-studio-main`.
3. Vercel reads `vercel.json` automatically.

## 2. Set environment variables (Project Settings -> Environment Variables)
Use values from `.env.example`:
- `GITHUB_TOKEN`
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `GITHUB_BRANCH`
- `GITHUB_PORTFOLIO_PATH`

`NITRO_PRESET=vercel` is already set in `vercel.json`.

## 3. GitHub token permissions
Create a fine-grained PAT with repository access for the target repo and grant:
- Contents: Read and write

## 4. How live storage works now
- Home page loads portfolio JSON from GitHub via server function.
- Dashboard loads GitHub data first.
- Dashboard Save commits updated JSON back to the configured GitHub file path.
- If GitHub read/write fails, app falls back to local seed/local storage.

## 5. Deploy
Push to `main` (or connected branch). Vercel builds and deploys automatically.
