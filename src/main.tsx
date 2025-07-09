import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Hotjar from '@hotjar/browser';

const supabaseUrl = import.meta.env.VITE_HO;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);