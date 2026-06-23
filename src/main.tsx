import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initMixpanel } from './lib/mixpanel';
import { initializeTracking } from './utils/analytics';

// Wire global listeners synchronously (cheap), but defer loading the heavy
// Mixpanel + session-replay chunk until the browser is idle so it never
// competes with the hero for first paint. Events fired in the gap are buffered
// by the analytics layer and flushed once the client is ready.
initializeTracking();
const startAnalytics = () => { void initMixpanel(); };

// Also kick off SDK load on first user interaction. pointerdown fires before
// click, giving the SDK a head start so CTA events aren't lost when navigation
// destroys the in-memory queue before the idle callback fires. initMixpanel()
// is idempotent, so both paths firing is safe.
const onFirstInteraction = () => {
  document.removeEventListener('pointerdown', onFirstInteraction, true);
  startAnalytics();
};
document.addEventListener('pointerdown', onFirstInteraction, { capture: true, passive: true });

if ('requestIdleCallback' in window) {
  requestIdleCallback(startAnalytics, { timeout: 3000 });
} else {
  setTimeout(startAnalytics, 1);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
