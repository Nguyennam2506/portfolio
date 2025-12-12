# Vibe Coding — Repo

This repository contains a portfolio site and utility scripts to prepare and deploy the site to GitHub Pages.

What’s here:
- `deploy/`: ready-to-deploy static site (index.html, styles.css, main.js)
- `.github/workflows/pages.yml`: GitHub Actions workflow that deploys the `deploy/` folder to GitHub Pages when you push to `main`.
- `scripts/push_deploy.ps1`: helper to stage, commit, and push changes locally (Windows PowerShell).
- `scripts/enable_pages.ps1`: helper to enable GitHub Pages via the GitHub REST API (requires a token with `repo` scope). 

How to get the site live:
1. Ensure Git is installed and you have a GitHub repository with a remote named `origin`.
2. From repo root, run (PowerShell):

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
# Stage, commit, and push; adjust -Branch param if needed
.\scripts\push_deploy.ps1 -Branch main -Message "Prepare deploy: add action + site files"
```

3. If you'd like to publish the `deploy/` folder by default and you want to enable GitHub Pages via API (optional), get a Personal Access Token with `repo` permission and run:

```powershell
$env:GITHUB_TOKEN = "ghp_xxx..."
.\scripts\enable_pages.ps1 -Owner <GitHubUserOrOrg> -Repo <YourRepo> -Branch gh-pages -Path "/"
```

4. The included GitHub Action runs on `push` to `main` and will publish the `deploy/` content to Pages. Confirm Pages settings in your repository's Settings → Pages if needed.

If you want me to push from here I need a Git client in the environment or to run those commands on your behalf locally.
