import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import CookieConsent from './components/CookieConsent.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <CookieConsent />
    </AuthProvider>
  </StrictMode>
);
