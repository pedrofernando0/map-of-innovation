import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GeekieLogo } from '../components/GeekieLogo';
import { Button } from '../components/ui';
import { useAppStore } from '../stores/appStore';
import { useServices } from '../contexts/AppServicesContext';
import type { DraftState } from '../ports/IStorageRepository';

export function Splash() {
  const navigate = useNavigate();
  const { reset, setProgress, setEscola, setRespostas, setAncora } = useAppStore();
  const { storage } = useServices();
  const [draft, setDraft] = useState<DraftState | null>(null);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const found = storage.loadDraft();
    if (found && found.escola.nome) {
      setDraft(found);
    }
  }, [storage]);

  const handleResume = () => {
    if (!draft) return;
    setEscola(draft.escola);
    setRespostas(draft.respostas);
    setAncora(draft.ancora);
    setProgress(40);
    setToast(true);
    setTimeout(() => setToast(false), 4000);
    navigate('/questoes');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-geekie-cereja)] text-white p-6 text-center relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => navigate('/admin')}
          className="text-sm opacity-50 hover:opacity-100 transition-opacity"
        >
          Acesso Admin
        </button>
      </div>
      <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-700 slide-in-from-bottom-8">
        <div className="flex flex-col items-center justify-center mb-8 gap-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <GeekieLogo variant="white" className="h-24 object-contain" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
          Mapa de Inovação Educacional
        </h1>

        <p className="text-xl md:text-2xl font-sans opacity-90 max-w-xl mx-auto">
          Descubra a maturidade da sua escola na integração entre práticas pedagógicas e tecnologia.
        </p>

        <div className="pt-12 flex flex-col items-center gap-4">
          <Button
            onClick={() => {
              reset();
              setProgress(10);
              navigate('/cadastro');
            }}
            size="lg"
            className="bg-white text-[var(--color-geekie-cereja)] hover:bg-gray-50 text-xl px-12 py-6 shadow-xl"
          >
            Iniciar Diagnóstico
          </Button>
          {draft && (
            <button
              onClick={handleResume}
              className="text-white text-base font-semibold underline underline-offset-4 opacity-90 hover:opacity-100 transition-opacity"
            >
              Continuar diagnóstico de {draft.escola.nome} →
            </button>
          )}
        </div>
      </div>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[var(--color-geekie-preto)] text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg z-50"
        >
          Respostas restauradas — continue de onde parou
        </div>
      )}
    </div>
  );
}
