# codenguhoc - Local website copies

This workspace contains two local copies of a portfolio site:
- `portfolio/` — primary copy, updated copy with your profile and styles.
- `html/` — alternate/test copy.

## Quick local preview (recommended)
Start a Python HTTP server in the folder containing the `index.html` you want to preview:

PowerShell examples:

```powershell
# Preview the portfolio copy
cd "c:\Users\Admin\OneDrive\Documents\codenguhoc\portfolio"
python -m http.server 8000 --bind 127.0.0.1
# then open: http://127.0.0.1:8000/

# Preview the html copy (alternate)
cd "c:\Users\Admin\OneDrive\Documents\codenguhoc\html"
python -m http.server 8001 --bind 127.0.0.1
# then open: http://127.0.0.1:8001/

# If you start server at the repo root, open this URL manually:
# http://127.0.0.1:8000/portfolio/index.html
```

## Common issues & fixes
- 404 for `styles.css` or `main.js`: Ensure `index.html` lies in the same folder as `styles.css` and `main.js` and that you're serving that folder with the HTTP server.
- Wrong index: If you start a server at repository root and intend to view `portfolio/index.html`, explicitly browse to `/portfolio/index.html`.
- If you want automatic redirection from repo root to the portfolio copy, we include `index.html` at the project root which redirects to `/portfolio/index.html`.

If you still see link errors, tell me the exact 404 URL shown in the browser DevTools Network tab or the error message printed in the Console, and I’ll debug further.