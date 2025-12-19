import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Hotjar from '@hotjar/browser';
import { initializeTracking } from './utils/analytics';
import { setupHotjarTriggers, initializeHotjarHeatmaps, setupSessionRecording } from './utils/hotjarConfig';
import { PostHogProvider } from 'posthog-js/react';

const siteId = import.meta.env.VITE_HOTJAR_SITE_ID;
const hotjarVersion = import.meta.env.VITE_HOTJAR_VERSION;

Hotjar.init(parseInt(siteId), parseInt(hotjarVersion));

// Initialize analytics tracking
initializeTracking();

// Set up Hotjar triggers and configuration
document.addEventListener('DOMContentLoaded', () => {
  setupHotjarTriggers();
  initializeHotjarHeatmaps();
  setupSessionRecording();
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={{
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
        defaults: '2025-05-24',
        capture_exceptions: true,
        debug: import.meta.env.MODE === 'development',
      }}
    >
      <App />
    </PostHogProvider>
  </StrictMode>
);
