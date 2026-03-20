import React from 'react';

import type { Scores } from '../../types';

const PILAR_DESC: Record<string, string> = {
  aa: 'Metodologias ativas e protagonismo do estudante',
  vis: 'Avaliação, dados e feedback formativo',
  flex: 'Autonomia curricular e adaptação ao contexto',
  pers: 'Diferenciação e percursos individualizados',
};

const CARDS = [
  { id: 'aa', nome: 'Aprendizagem Ativa', key: 'aprendizagem_ativa' as const, cor: '#ff1547' },
  { id: 'vis', nome: 'Visibilidade', key: 'visibilidade' as const, cor: '#0fc3e6' },
  { id: 'flex', nome: 'Flexibilidade', key: 'flexibilidade' as const, cor: '#32cd91' },
  { id: 'pers', nome: 'Personalização', key: 'personalizacao' as const, cor: '#6146f1' },
];

interface Props {
  pilares: Scores['pilares'];
}

export function ResultadoPilares({ pilares }: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[var(--color-geekie-preto)]">Pilares da Geekie</h3>
        <p className="text-sm text-gray-500 mt-1">
          Os 4 pilares medem dimensões complementares da inovação educacional. Juntos, revelam como
          sua escola integra pedagogia e tecnologia de forma intencional.
        </p>
      </div>
      <div className="space-y-5">
        {CARDS.map((c, i) => {
          const score = pilares[c.key];
          const displayScore = Math.max(score, 4);
          return (
            <div
              key={c.id}
              className="animate-in slide-in-from-left-4 fade-in duration-500 fill-mode-both"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-baseline justify-between mb-1.5">
                <div>
                  <span className="text-sm font-bold" style={{ color: c.cor }}>
                    {c.nome}
                  </span>
                  <span className="text-xs text-gray-400 ml-2">{PILAR_DESC[c.id]}</span>
                </div>
                <span
                  className="text-xl font-extrabold flex-shrink-0 ml-4"
                  style={{ color: c.cor }}
                >
                  {score}
                  <span className="text-xs text-gray-400 font-normal">/100</span>
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                <div
                  className="h-4 rounded-full transition-all duration-700"
                  style={{ width: `${displayScore}%`, backgroundColor: c.cor, opacity: 0.85 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
