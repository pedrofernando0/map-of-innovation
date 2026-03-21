import React, { useCallback, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import { Header } from '../components/Header';
import { useKioskMode } from '../hooks/useKioskMode';
import { useAppStore } from '../stores/appStore';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export function AppLayout() {
  const navigate = useNavigate();
  const { reset } = useAppStore();

  const handleReset = useCallback(() => {
    reset();
    navigate('/');
  }, [reset, navigate]);

  const { showWarning } = useKioskMode(true, handleReset);

  return (
    <div className="min-h-screen bg-[var(--color-geekie-branco)]">
      <ScrollToTop />
      <Header />
      <main className="overflow-x-hidden">
        <Outlet />
      </main>
      {showWarning && (
        <div
          role="status"
          aria-live="assertive"
          className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 text-white text-center py-4 px-6 text-sm font-medium"
        >
          Sessão encerrando em 30 segundos por inatividade — toque para continuar
        </div>
      )}
    </div>
  );
}
