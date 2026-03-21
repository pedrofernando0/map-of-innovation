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

  useKioskMode(true, handleReset);

  return (
    <div className="min-h-screen bg-[var(--color-geekie-branco)]">
      <ScrollToTop />
      <Header />
      <main className="overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
