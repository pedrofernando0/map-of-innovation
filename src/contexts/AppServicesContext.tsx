import React, { createContext, useContext, useMemo } from 'react';

import type { IStorageRepository } from '../ports/IStorageRepository';
import type { IDiagnosticService } from '../ports/IDiagnosticService';
import { LocalStorageAdapter } from '../adapters/LocalStorageAdapter';
import { LocalDiagnosticAdapter } from '../adapters/LocalDiagnosticAdapter';

interface AppServicesContextValue {
  storage: IStorageRepository;
  diagnostic: IDiagnosticService;
}

const AppServicesContext = createContext<AppServicesContextValue | null>(null);

export function AppServicesProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo<AppServicesContextValue>(
    () => ({
      storage: new LocalStorageAdapter(),
      diagnostic: new LocalDiagnosticAdapter(),
    }),
    []
  );

  return <AppServicesContext.Provider value={value}>{children}</AppServicesContext.Provider>;
}

export function useServices(): AppServicesContextValue {
  const ctx = useContext(AppServicesContext);
  if (!ctx) throw new Error('useServices deve ser usado dentro de AppServicesProvider');
  return ctx;
}
