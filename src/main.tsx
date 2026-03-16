import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StatsigProvider } from '@statsig/react-bindings';
import App from './App.tsx';
import './index.css';
import { initializeTracking } from './utils/analytics';
import { PostHogProvider } from 'posthog-js/react';
import { getStatsigClient, initStatsig } from './lib/statsig';

initializeTracking();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

initStatsig().catch((err) => {
  console.error('Statsig initialization failed, falling back to control variants:', err);
}).finally(() => {
  createRoot(rootElement).render(
    <StrictMode>
      <StatsigProvider client={getStatsigClient()}>
        <PostHogProvider
          apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
          options={{
            api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
            capture_exceptions: true,
            debug: import.meta.env.MODE === 'development',
          }}
        >
          <App />
        </PostHogProvider>
      </StatsigProvider>
    </StrictMode>
  );
});
