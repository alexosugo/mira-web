[![Netlify Status](https://api.netlify.com/api/v1/badges/66c9d9aa-b369-4784-978b-916d99e99664/deploy-status?branch=main)](https://app.netlify.com/projects/withmira/deploys)

# Sellogram — Marketing Site

Landing page for Sellogram: an AI assistant that answers a shop's Instagram DMs and sells in them. Built for Kenyan Instagram sellers; converts visitors to waitlist signups.

## Stack

- **Astro** — static site generator with island architecture
- **React 18** — interactive UI components (via `@astrojs/react`)
- **TypeScript** — end-to-end type safety
- **Tailwind CSS** — utility-first styling
- **Netlify** — hosting + serverless functions
- **Vitest** — unit tests

## Getting Started

### Prerequisites

Node.js ≥ 22.12.0 (required by the build tooling).

### Install

```bash
npm install
```

### Development

```bash
npm run dev          # Astro dev server at http://localhost:4321
npm run dev:netlify  # Netlify Dev (runs functions locally)
```

### Build & Preview

```bash
npm run build    # Production build → dist/
npm run preview  # Preview the production build locally
```

### Tests

```bash
npm test              # Run unit tests once
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Lint

```bash
npm run lint
```

## Project Structure

```
mira-web/
├── src/
│   ├── components/      # Astro + React components
│   ├── layouts/         # Page layouts
│   ├── pages/           # File-based routing (index.astro, ...)
│   └── styles/          # Global CSS
├── netlify/
│   └── functions/       # Netlify serverless functions (TypeScript)
│       └── elite-inquiry.ts  # Elite inquiry → Slack webhook
├── public/              # Static assets
├── brand/               # Brand foundations (palette, typography, motion)
├── docs/                # Voice, tone, and design docs
├── astro.config.mjs     # Astro configuration
├── tailwind.config.js  # Tailwind configuration
└── package.json
```

## Design Context

Before any UI, copy, or design work, read:

- **`PRODUCT.md`** — brand register, users, Instagram-DM positioning, anti-references, design principles.
- **`brand/foundations.md`** — approved palette, typography, shape language, motion.
- **`docs/voice-and-tone.md`** — voice rules: no jargon, no "AI-powered", no exclamation points.

## Serverless Functions

| Function | Path | Purpose |
|---|---|---|
| `elite-inquiry` | `/.netlify/functions/elite-inquiry` | Forwards waitlist inquiries to a Slack webhook |

### Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `SLACK_ELITE_WEBHOOK_URL` | Yes | Incoming webhook URL for the elite inquiry Slack channel |

## Deployment

The site is deployed on Netlify from the `main` branch. Every push triggers a build; PRs get deploy previews automatically.

## License

Proprietary — all rights reserved.
