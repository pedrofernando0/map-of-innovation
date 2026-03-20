import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/ui';
import { useAppStore } from '../stores/appStore';
import { useQuestionnaire } from '../hooks/useQuestionnaire';
import { useDiagnostico } from '../hooks/useDiagnostico';
import { useServices } from '../contexts/AppServicesContext';
import { calculateScores } from '../domain/scoring/calculateScores';

export function Questoes() {
  const navigate = useNavigate();
  const { respostas, escola, ancora, setRespostas, setScores, setDiagnostico, setProgress } =
    useAppStore();
  const { storage, diagnostic } = useServices();
  const { generate } = useDiagnostico(diagnostic);

  const handleFinish = async () => {
    navigate('/loading');
    const scores = calculateScores(respostas);
    const diagnostico = await generate(escola, scores, ancora);
    const finalState = { ...useAppStore.getState(), scores, diagnostico };
    setScores(scores);
    setDiagnostico(diagnostico);
    storage.save({ ...finalState, scores, diagnostico });
    setProgress(90);
    navigate('/resultado');
  };

  const handleBack = () => {
    setProgress(30);
    navigate('/ancora');
  };

  const {
    blocoAtual,
    bloco,
    totalBlocos,
    todasRespondidas,
    pendentes,
    isLastBloco,
    handleNext,
    handleBack: questBack,
  } = useQuestionnaire(respostas, handleFinish, handleBack);

  const handleChange = (id: string, val: number) => {
    const novas = { ...respostas, [id]: val };
    setRespostas(novas);
    setProgress(40 + (Object.keys(novas).length / 20) * 40);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="mb-10">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
          Bloco {blocoAtual + 1} de {totalBlocos}
        </h2>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-geekie-cereja)]">
          {bloco.titulo}
        </h1>
      </div>

      <div className="space-y-12">
        {bloco.qs.map((q, i) => (
          <div
            key={q.id}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="flex gap-4 mb-6">
              <div className="flex-shrink-0 w-10 h-10 bg-red-50 text-[var(--color-geekie-cereja)] rounded-full flex items-center justify-center font-bold text-lg">
                {blocoAtual * 5 + i + 1}
              </div>
              <p className="text-xl md:text-2xl text-[var(--color-geekie-preto)] leading-snug pt-1">
                {q.texto}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
              {q.escala.map((texto, idx) => {
                const valor = idx + 1;
                return (
                  <button
                    key={valor}
                    onClick={() => handleChange(q.id, valor)}
                    className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                      respostas[q.id] === valor
                        ? 'border-[var(--color-geekie-cereja)] bg-red-50 text-[var(--color-geekie-cereja)] font-bold shadow-sm'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-sm leading-tight">{texto}</div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky bottom-4 z-10">
        <Button variant="outline" onClick={questBack}>
          ← Voltar
        </Button>
        <div className="text-gray-500 font-medium hidden sm:block">
          {todasRespondidas
            ? `${bloco.qs.length} de ${bloco.qs.length} respondidas`
            : `Faltam ${pendentes} respostas para avançar`}
        </div>
        <Button onClick={handleNext} size="lg" disabled={!todasRespondidas}>
          {isLastBloco ? 'Ver Resultado Final' : 'Próximo Bloco →'}
        </Button>
      </div>
    </div>
  );
}
