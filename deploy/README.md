# Deploy folder

This `deploy` folder contains the minimal static site files ready for deployment to GitHub Pages or any static host.

Included files:
- `index.html` — main page
- `styles.css` — site CSS
- `main.js` — site JavaScript

How to deploy to GitHub Pages (root branch):

1. Ensure you have a git repository initialized and a remote configured.
2. Copy or move the `deploy` folder contents to the repository root (or serve the `deploy` folder directly with a separate branch).
3. Commit and push the changes.

Example commands (from repo root):

```powershell
git add -A
git commit -m "Add static site for GitHub Pages"
git push origin main
```

To use the `gh-pages` branch instead, you can run:

```powershell
npx gh-pages -d deploy
```

Automatic deployment (recommended):

1. This repo includes a GitHub Actions workflow at `.github/workflows/pages.yml` that deploys the `deploy/` folder to GitHub Pages whenever you push to `main`.
2. After pushing, the first workflow run will publish the site using the GitHub Pages 'Actions' deployment method. You may need to allow workflow permissions in your repository's settings.
3. If the repo is private, set Pages' permissions and ensure `GITHUB_TOKEN` has sufficient rights (usually default works for Actions deployments).

If you'd like me to add a `CNAME` for a custom domain or copy the `deploy` content into `docs/` automatically, let me know.
