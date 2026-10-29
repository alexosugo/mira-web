# Mixpanel Analytics — Developer Handoff

**Project:** mira-web (marketing landing page)
**Branch merged:** `feat/mixpanel-analytics`
**Replaces:** Statsig, Google Analytics, Hotjar, Ahrefs pixel (all removed)

---

## Architecture in one sentence

Mixpanel loads lazily after first paint; a thin wrapper layer in `src/utils/analytics.ts` is the only thing components touch — the SDK never leaks into UI code.

---

## File map

| File | Role |
|---|---|
| `src/lib/mixpanel.ts` | SDK init, event buffer, UTM capture, cookie persistence |
| `src/utils/analytics.ts` | Typed wrappers — the stable seam all components import |
| `src/hooks/useTracking.ts` | React hooks for section visibility, scroll depth, CTA clicks |
| `src/main.tsx` | Boot: wires global listeners, schedules SDK load on idle |

---

## How it boots (`src/main.tsx`)

```ts
initializeTracking();   // global error + perf listeners (sync, cheap)
requestIdleCallback(() => initMixpanel(), { timeout: 3000 });
```

`initializeTracking` attaches `window.error` and `window.load` handlers immediately (no SDK needed). `initMixpanel` dynamically imports `mixpanel-browser` — keeping the ~150 kB chunk off the critical path. Events fired before the import resolves are buffered in `pending[]` inside `mixpanel.ts` and flushed automatically.

---

## SDK config (`src/lib/mixpanel.ts`)

| Option | Value | Why |
|---|---|---|
| `persistence` | `'cookie'` | Survives redirect to `app.withmira.co` |
| `cross_subdomain_cookie` | `true` | Cookie shared across `*.withmira.co` |
| `track_pageview` | `false` | We fire `page_viewed` ourselves |
| `record_sessions_percent` | `100` | Full session replay pre-GTM |
| `record_heatmap_data` | `true` | Heatmap on all sessions |
| `debug` | `import.meta.env.DEV` | Verbose logs in local dev only |

**UTM super-properties** are read from the landing URL on init and registered on every subsequent event automatically: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `initial_referrer`, `landing_path`.

**No `identify()` is ever called on this site.** The anonymous `$device_id` cookie must stay unclaimed so `app.withmira.co` can merge the full marketing → signup journey at real signup via Mixpanel Simplified ID Merge.

---

## Environment variables

| Var | Required | Notes |
|---|---|---|
| `VITE_MIXPANEL_TOKEN` | Yes | Set in Netlify dashboard; use a separate dev-project token locally via `.env.local` |
| `VITE_MIXPANEL_API_HOST` | No | Only needed for EU data residency, e.g. `https://api-eu.mixpanel.com` |

If `VITE_MIXPANEL_TOKEN` is unset, analytics silently no-ops — the site never breaks.

---

## Event inventory

### Automatic (wired in `initializeTracking` / `main.tsx`)

| Event | Properties | Fired when |
|---|---|---|
| `javascript_error` | `error_source`, `error_line`, `error_column`, `message` | Any uncaught JS error |
| `page_load_time` | `load_time` (ms), `dom_ready` (ms) | `window.load` fires |
| `page_viewed` | `page_name: "Landing Page"`, `page_section: "main"` | App mounts (`App.tsx:17`) |

### Scroll depth (`useScrollTracking` hook)

| Event | Properties | Fired when |
|---|---|---|
| `page_scrolled` | `depth_percent: 25 \| 50 \| 75 \| 100` | User crosses each threshold (once per session) |

### Section visibility (`useSectionTracking` hook)

| Event | Properties | Fired when |
|---|---|---|
| `section_viewed` | `section_id`, `section_name` | Section is 50% in viewport (once per section) |

### CTA clicks

| Event | Properties | Fired when |
|---|---|---|
| `cta_clicked` | `button_id`, `button_text`, `page_section`, `...additionalData` | Any CTA tracked via `trackCTAClick()` or `useCTATracking()` hook |

### Footer

| Event | Properties | Fired when |
|---|---|---|
| `contact_link_clicked` | `contact_type`, `location: "footer"` | Footer contact link clicked (`Footer.tsx:20`) |

### Elite contact form (`EliteContactModal.tsx`)

| Event | Properties | Notes |
|---|---|---|
| `form_submitted` | `form_id: "elite_contact_form"`, `form_name: "Elite Contact"`, `submission_status: "attempt"`, `plan_type: "elite"`, `opt_in_updates` | Fires on every submit attempt — no PII |
| `form_submitted` | same + `submission_status: "error"` | Fires only on network/backend failure |
| `lead_captured` | `lead_type: "elite"`, `email`, `contact_name`, `shop_name`, `opt_in_updates` | Value Moment — fires only on success |

`form_submitted` and `lead_captured` are intentionally separate: `form_submitted` tracks funnel friction (attempts, errors), `lead_captured` is the conversion event. Never collapse them.

---

## What still needs to happen in `app.withmira.co`

The marketing site sends anonymous events. The handoff to the app works like this:

1. User lands on `withmira.co` → Mixpanel sets a `$device_id` cookie on `.withmira.co`
2. User signs up in `app.withmira.co` → app calls `mixpanel.identify(dbUserId)` using **the same Mixpanel project token**
3. Mixpanel's Simplified ID Merge links all prior anonymous events to the real user

**This only works if both sites use the same Mixpanel project.** See Linear issue MIN-234.

---

## Adding a new event

1. Import `trackEvent` (or the appropriate typed wrapper) from `src/utils/analytics.ts`
2. Follow the naming convention: `object_verb`, past tense, snake_case (e.g. `pricing_card_clicked`)
3. Keep property values as native types (numbers stay numeric — Mixpanel can aggregate them)
4. Never import from `src/lib/mixpanel.ts` directly in components
