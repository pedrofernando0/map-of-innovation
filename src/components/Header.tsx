import React from 'react';
import { ProgressBar } from './ui';

interface HeaderProps {
  progress?: number;
}

export function Header({ progress = 0 }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[var(--color-geekie-cereja)] rounded-lg px-3 py-1.5">
            <img src="/geekie-logo.png" alt="Geekie Educação" className="h-6 object-contain" />
          </div>
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
