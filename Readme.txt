This project is intentionally deployed to two hosts, both built from the same
push to `main` and serving identical artifacts:

  1. GitHub Pages (primary / canonical URL)
     https://nirajrchaudhari.github.io/
     - Deploys via .github/workflows/deploy.yml (push to main)

  2. Netlify
     https://niraj-profile.netlify.app/
     - Auto-deploys on push to main (site linked to this repo in Netlify)
     - Build settings version-controlled in netlify.toml (Node 18, dist/)

Keep both with:
- Push to `main` updates both automatically; no per-host releases needed.
- Verify sync by comparing the hashed asset filenames in each host's
  index.html (e.g. /assets/index-<hash>.js) — they must match.
- `vite.config.js` has no `base` setting on purpose: both domains serve the
  site at the root, and all asset URLs in code stay relative without a
  leading slash so they resolve on either host.
