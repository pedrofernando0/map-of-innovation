import React from 'react';
import { Button } from '../components/ui';

interface SplashProps {
  onNext: () => void;
}

export function Splash({ onNext }: SplashProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-geekie-cereja)] text-white p-6 text-center relative">
      <div className="absolute top-4 right-4">
        <button 
          onClick={() => window.location.hash = '#admin'}
          className="text-sm opacity-50 hover:opacity-100 transition-opacity"
        >
          Acesso Admin
        </button>
      </div>
      <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-700 slide-in-from-bottom-8">
        <div className="flex flex-col items-center justify-center mb-8 gap-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <img src="/geekie-logo.png" alt="Geekie Educação" className="h-24 object-contain brightness-0 invert" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
          Mapa de Inovação
        </h1>
        
        <p className="text-xl md:text-2xl font-sans opacity-90 max-w-xl mx-auto">
          Descubra a maturidade da sua escola na integração entre práticas pedagógicas e tecnologia.
        </p>
        
        <div className="pt-12">
          <Button 
            onClick={onNext}
            size="lg" 
            className="bg-white text-[var(--color-geekie-cereja)] hover:bg-gray-50 text-xl px-12 py-6 shadow-xl"
          >
            Iniciar Diagnóstico
          </Button>
        </div>
      </div>
    </div>
  );
}
