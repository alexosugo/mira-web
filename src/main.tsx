import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StatsigProvider } from '@statsig/react-bindings';
import App from './App.tsx';
import './index.css';
import { initializeTracking } from './utils/analytics';
import { getStatsigClient, initStatsig } from './lib/statsig';

initializeTracking();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

// Initialize Statsig without blocking the first paint. Gating render on the
// async network round-trip left the hero blank until the experiment SDK
// responded (a real LCP hit on slow mobile data). initStatsig() attaches the
// data adapter synchronously from cache, then refreshes in the background.
initStatsig();

createRoot(rootElement).render(
  <StrictMode>
    <StatsigProvider client={getStatsigClient()}>
      <App />
    </StatsigProvider>
  </StrictMode>
);
