import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { AppServicesProvider } from './contexts/AppServicesContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppServicesProvider>
        <App />
      </AppServicesProvider>
    </BrowserRouter>
  </StrictMode>
);
