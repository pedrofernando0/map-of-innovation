import React, { useState } from 'react';
import { Button } from '../components/ui';
import { QUESTOES, ESCALA_RESPOSTAS } from '../constants';

interface QuestoesProps {
  respostas: Record<string, number>;
  onChange: (id: string, val: number) => void;
  onFinish: () => void;
  onBack: () => void;
}

export function Questoes({ respostas, onChange, onFinish, onBack }: QuestoesProps) {
  const [blocoAtual, setBlocoAtual] = useState(0);
  const blocos = [
    { titulo: 'Aprendizagem Ativa', qs: QUESTOES.slice(0, 5) },
    { titulo: 'Visibilidade', qs: QUESTOES.slice(5, 10) },
    { titulo: 'Flexibilidade', qs: QUESTOES.slice(10, 15) },
    { titulo: 'Personalização', qs: QUESTOES.slice(15, 20) }
  ];

  const bloco = blocos[blocoAtual];
  const todasRespondidas = bloco.qs.every(q => respostas[q.id]);

  const handleNext = () => {
    if (blocoAtual < blocos.length - 1) {
      setBlocoAtual(blocoAtual + 1);
      window.scrollTo(0, 0);
    } else {
      onFinish();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="mb-10">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
          Bloco {blocoAtual + 1} de {blocos.length}
        </h2>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-geekie-cereja)]">
          {bloco.titulo}
        </h1>
      </div>

      <div className="space-y-12">
        {bloco.qs.map((q, i) => (
          <div key={q.id} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex gap-4 mb-6">
              <div className="flex-shrink-0 w-10 h-10 bg-red-50 text-[var(--color-geekie-cereja)] rounded-full flex items-center justify-center font-bold text-lg">
                {blocoAtual * 5 + i + 1}
              </div>
              <p className="text-xl md:text-2xl text-[var(--color-geekie-preto)] leading-snug pt-1">
                {q.texto}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-8">
              {ESCALA_RESPOSTAS.map((op) => (
                <button
                  key={op.valor}
                  onClick={() => onChange(q.id, op.valor)}
                  className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    respostas[q.id] === op.valor
                      ? 'border-[var(--color-geekie-cereja)] bg-red-50 text-[var(--color-geekie-cereja)] font-bold shadow-sm'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-sm leading-tight">{op.texto}</div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky bottom-4 z-10">
        <Button variant="outline" onClick={() => {
          if (blocoAtual > 0) {
            setBlocoAtual(blocoAtual - 1);
            window.scrollTo(0, 0);
          } else {
            onBack();
          }
        }}>
          ← Voltar
        </Button>
        <div className="text-gray-500 font-medium hidden sm:block">
          {bloco.qs.filter(q => respostas[q.id]).length} de {bloco.qs.length} respondidas
        </div>
        <Button 
          onClick={handleNext} 
          size="lg"
          disabled={!todasRespondidas}
        >
          {blocoAtual < blocos.length - 1 ? 'Próximo Bloco →' : 'Ver Resultado Final'}
        </Button>
      </div>
    </div>
  );
}
