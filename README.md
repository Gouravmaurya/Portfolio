# Gourav Maurya — Portfolio

This repository publishes Gourav’s static full-stack and AI portfolio from `dist/`. It replaces the earlier Next.js portfolio on `main`; that version remains available in Git history and the existing `v1` and `v2` branches.

The site includes four selected projects, professional background, a résumé, and Gourav’s portraits. It was prepared from `gourav-portfolio-v1` branch `gourav-maurya` at commit `76803f8`.

## Local preview

```sh
python -m http.server 4185 --directory dist
```

Vercel is configured through `vercel.json` to publish `dist/` as a static site. No build step is required.

## Interactive folio experiment

The `experiment/interactive-folio` branch adds an optional, full-screen project folio. Visitors can open any work image, move through all four projects with the index, buttons, or arrow keys, and follow the original external project links. Escape and the close control return focus to the opener. The ordinary project links remain usable if JavaScript is unavailable; reduced-motion preferences remove the project reveal. The experiment was developed separately from the published site so it can be reviewed before release.
