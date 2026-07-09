# Saad GitHub Pages Portfolio

A simple, data-driven portfolio for GitHub Pages.

## What this contains

- Static portfolio website
- Project showcase cards
- Competency sections
- Experience profile
- Structured JSON data files
- GitHub Actions workflow for validation and Pages deployment

## Recommended GitHub Pages setup

Create a public repository named:

```text
AIGenArt.github.io
```

Then upload these files to the `main` branch.

The intended live URL is:

```text
https://aigenart.github.io/
```

## Edit content

Most content is in these files:

```text
data/profile.json
data/projects.json
data/competencies.json
data/experience.json
data/principles.json
```

## Local preview

```bash
python -m http.server 4173
```

Open:

```text
http://localhost:4173
```

## Validate data

```bash
node scripts/validate.mjs
```

## Notes

This project avoids a heavy build system. It is intentionally simple, fast and easy to update.
