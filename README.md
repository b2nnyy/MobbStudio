# Mobb Studios — Studio Website

Responsive, production-ready static website for **Mobb Studios** built with **Vite + React + TypeScript + Tailwind CSS** (no backend). Bookings route to Instagram DMs.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Routing & GitHub Pages

- Uses **`HashRouter`** (safe for GitHub Pages refresh/deep links).
- Asset base path is configured in [`vite.config.ts`](vite.config.ts) as:
  - Default: `./` (works for `/<repo>/` and custom domains)
  - Override for project pages: set `VITE_BASE_PATH`

Example (project pages at `https://<user>.github.io/<repo>/`):

```bash
VITE_BASE_PATH=/<repo>/ npm run build
```

## Updating site-wide content

Edit constants in:

- [`src/lib/constants.ts`](src/lib/constants.ts)

This includes:
- Instagram handle + URL
- Rates
- Deposit percent + minimum hours
- Map embed placeholder URL

## Missing assets checklist (client to provide later)

- Studio photos
- Portfolio links
- Email address
- Phone number
- Exact map pin or address (to replace the placeholder embed)
- Any additional policies to share before/after booking
- Future booking platform choice (to replace/augment Instagram DM CTA)
