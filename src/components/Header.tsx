import React from 'react';

import { useAppStore } from '../stores/appStore';

import { GeekieLogo } from './GeekieLogo';
import { ProgressBar } from './ui';

export function Header() {
  const progress = useAppStore((s) => s.progress);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GeekieLogo variant="color" className="h-8 object-contain" />
        </div>
        <div className="hidden sm:block text-sm text-gray-500 font-heading">
          Mapa de Inovação Educacional
        </div>
      </div>
      {progress > 0 && (
        <div className="absolute bottom-0 left-0 w-full">
          <ProgressBar progress={progress} />
        </div>
      )}
    </header>
  );
}
