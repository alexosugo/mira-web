import { type OverridedMixpanel } from 'mixpanel-browser';

// Mixpanel is the single analytics tool for the site (Statsig, GA, Hotjar, and
// the Ahrefs pixel were all removed). The SDK — and especially its session
// replay recorder (rrweb) — is heavy, so it is loaded via dynamic import() into
// its own async chunk *after* first paint. Events fired before the client is
// ready are buffered and flushed on load, so nothing in the gap is dropped.

let mp: OverridedMixpanel | null = null;
let loading = false;

/** Actions queued before the client finishes loading, replayed on ready. */
const pending: Array<(client: OverridedMixpanel) => void> = [];

// Public client token — it ships in the browser bundle regardless, so it is not
// a secret. Override per-environment via VITE_MIXPANEL_TOKEN; set a separate
// dev-project token locally so `npm run dev` does not write to the prod project.
const TOKEN = import.meta.env.VITE_MIXPANEL_TOKEN ?? 'eea24a73ea5ead32dfdaeeff0cfbde2f';
// Optional EU residency host, e.g. https://api-eu.mixpanel.com. Leave unset for
// the default US ingestion endpoint (must match your Mixpanel project region).
const API_HOST = import.meta.env.VITE_MIXPANEL_API_HOST;

/** UTM and referrer keys captured once and attached to every event as super properties. */
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

/**
 * Run an action against the client now, or buffer it until the client loads.
 * Actions are dropped only when no token is configured (analytics disabled).
 */
function withClient(action: (client: OverridedMixpanel) => void): void {
  if (mp) {
    action(mp);
  } else if (TOKEN) {
    pending.push(action);
  }
}

/**
 * Read UTM params + referrer from the landing URL so every event (and the
 * eventual signup) carries its acquisition channel. Registered as super
 * properties, which Mixpanel persists across the session.
 */
function captureAttribution(): Record<string, string> {
  const attribution: Record<string, string> = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) attribution[key] = value;
    }
    if (document.referrer) attribution.initial_referrer = document.referrer;
    attribution.landing_path = window.location.pathname;
  } catch {
    // URL parsing should never break the page; fall through with what we have.
  }
  return attribution;
}

/**
 * Lazily load and initialize Mixpanel. Idempotent and safe to call without a
 * token (local dev): it warns and no-ops so the site never depends on analytics
 * being configured. Best called after first paint (e.g. on idle).
 */
export async function initMixpanel(): Promise<void> {
  if (mp || loading || typeof window === 'undefined') return;
  if (!TOKEN) {
    console.warn('VITE_MIXPANEL_TOKEN is not set; analytics is disabled.');
    return;
  }

  loading = true;
  try {
    const { default: mixpanel } = await import('mixpanel-browser');

    mixpanel.init(TOKEN, {
      ...(API_HOST ? { api_host: API_HOST } : {}),
      // Cookie (not localStorage) so the anon distinct_id + UTM super-properties
      // survive the redirect from this marketing site to app.withmira.co. The
      // cookie is set on the shared root domain (.withmira.co), so attribution
      // carries across subdomains — IF the app initializes the same Mixpanel
      // project. (No-op for genuinely cross-domain redirects; see README/handoff.)
      persistence: 'cookie',
      cross_subdomain_cookie: true,
      // We fire a semantic page_view ourselves (see analytics.trackPageView), so
      // the SDK's generic autocapture pageview would just be noise.
      track_pageview: false,
      // Session replay: record every session for a pre-GTM landing page where
      // qualitative drop-off signal matters more than sampling cost. The
      // recorder ships in this dynamically-imported chunk, off the critical path.
      record_sessions_percent: 100,
      record_heatmap_data: true,
      debug: import.meta.env.DEV,
    });

    const attribution = captureAttribution();
    if (Object.keys(attribution).length > 0) {
      mixpanel.register(attribution);
    }

    mp = mixpanel;
    for (const action of pending.splice(0)) action(mp);
  } catch (err) {
    console.error('Mixpanel failed to load; analytics is disabled this session:', err);
    loading = false; // allow a later retry
  }
}

/** Log an event, buffering until the client is ready. Properties keep native types. */
export function track(eventName: string, properties: Record<string, unknown> = {}): void {
  withClient((client) => client.track(eventName, properties));
}

// Note: this marketing site deliberately never calls mixpanel.identify(). Leads
// have no stable user id yet, and Mixpanel forbids email-as-$user_id (emails
// change). Staying anonymous keeps the cookie's $device_id free to be claimed by
// app.withmira.co's identify(dbUserId) at real signup, so Simplified ID Merge
// stitches the whole marketing -> app journey to that user. Identifying here
// would prematurely claim the device and sever that merge.
