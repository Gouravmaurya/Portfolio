# Gourav Maurya — Portfolio

This repository publishes Gourav’s static full-stack and AI portfolio from `dist/`. It replaces the earlier Next.js portfolio on `main`; that version remains available in Git history and the existing `v1` and `v2` branches.

The site includes four selected projects, professional background, a résumé, and Gourav’s portraits. It was prepared from `gourav-portfolio-v1` branch `gourav-maurya` at commit `76803f8`.

## Local preview

```sh
python -m http.server 4185 --directory dist
```

Vercel is configured through `vercel.json` to publish `dist/` as a static site. No build step is required.
