import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Hotjar from '@hotjar/browser';

const siteId = import.meta.env.VITE_HOTJAR_SITE_ID;
const hotjarVersion = import.meta.env.VITE_HOTJAR_VERSION;

Hotjar.init(parseInt(siteId), parseInt(hotjarVersion));

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);