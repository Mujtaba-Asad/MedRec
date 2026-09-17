# MedRec — Landing Page

A multipage marketing site for MedRec, a patient-owned health record app for Pakistan. Built with plain HTML/CSS/JS (no build step, no framework, no dependencies to install).

## Files

- `index.html` — the full page shell (nav, footer, styles)
- `app.js` — hash-based router and all page content (Home, Features, How It Works, Pricing, About, Contact)
- `logo-lockup.png` / `logo-icon.png` — logo assets used in the header, footer, and about page

## Running locally

Just open `index.html` in a browser, or serve the folder with any static server, e.g.:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Deploying with GitHub Pages

1. Push this folder's contents to a GitHub repo (either at the repo root, or into a `docs/` folder).
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set the source branch to `main` (and folder to `/` or `/docs`, matching where you put these files).
4. Save — GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/`.

No build step is required since this is static HTML/CSS/JS.

## Notes

- Pricing figures and contact details in the site are placeholders — update them in `app.js` before sharing publicly.
- The waitlist form on the Contact page validates client-side only; wire it up to a real backend or form service (e.g. Formspree, a serverless function) before relying on it to collect real signups.
