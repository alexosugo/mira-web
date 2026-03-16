import { StatsigClient } from '@statsig/js-client';
import { StatsigSessionReplayPlugin } from '@statsig/session-replay';
import { StatsigAutoCapturePlugin } from '@statsig/web-analytics';

let client: StatsigClient | null = null;

function getOrCreateAnonId(): string {
  try {
    const key = 'mira_statsig_uid';
    let id = localStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem(key, id);
    }
    return id;
  } catch {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }
}

export function getStatsigClient(): StatsigClient {
  if (client) return client;

  client = new StatsigClient(
    import.meta.env.VITE_STATSIG_CLIENT_KEY,
    { userID: getOrCreateAnonId() },
    {
      plugins: [
        new StatsigSessionReplayPlugin(),
        new StatsigAutoCapturePlugin(),
      ],
    }
  );

  return client;
}

export function initStatsig(): Promise<void> {
  const c = getStatsigClient();
  return c.initializeAsync();
}
