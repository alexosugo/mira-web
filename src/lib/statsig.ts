import { StatsigClient } from '@statsig/js-client';
import { StatsigSessionReplayPlugin } from '@statsig/session-replay';
import { StatsigAutoCapturePlugin } from '@statsig/web-analytics';

let client: StatsigClient | null = null;

export function getStatsigClient(): StatsigClient {
  if (client) return client;

  client = new StatsigClient(
    import.meta.env.VITE_STATSIG_CLIENT_KEY,
    {},
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
