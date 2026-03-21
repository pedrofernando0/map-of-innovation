import React from 'react';
import { useNavigate } from 'react-router-dom';

import { BettAtivacoes } from '../components/BettAtivacoes';
import { ResultadoHeader } from '../components/resultado/ResultadoHeader';
import { ResultadoPilares } from '../components/resultado/ResultadoPilares';
import { ResultadoEixos } from '../components/resultado/ResultadoEixos';
import { ResultadoDiagnostico } from '../components/resultado/ResultadoDiagnostico';
import { AncoraComparacao } from '../components/resultado/AncoraComparacao';
import { useAppStore } from '../stores/appStore';

export function Resultado() {
  const navigate = useNavigate();
  const { escola, scores, diagnostico, ancora, setProgress } = useAppStore();

  return (
    <div className="screen-resultado max-w-5xl mx-auto px-4 py-8 md:py-12 animate-in fade-in duration-500 space-y-8">
      <ResultadoHeader escola={escola} scores={scores} ancora={ancora} />
      <AncoraComparacao ancora={ancora} nivelReal={scores.nivel} />
      <ResultadoEixos scores={scores} />
      <ResultadoPilares pilares={scores.pilares} />
      <BettAtivacoes scores={scores} />
      <ResultadoDiagnostico
        diagnostico={diagnostico}
        onPrint={() => window.print()}
        onContinue={() => {
          setProgress(100);
          navigate('/csp');
        }}
      />
      <div className="mt-4 text-center no-print opacity-20 hover:opacity-100 transition-opacity">
        <button
          onClick={() => window.location.reload()}
          className="text-xs text-[var(--color-text-tertiary)] hover:text-gray-600"
        >
          Novo preenchimento (Reset)
        </button>
      </div>
    </div>
  );
}
