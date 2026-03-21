import React, { useState } from 'react';

import type { Scores } from '../../types';

function InfoTooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  const tooltipId = 'pilares-info-tooltip';
  return (
    <span className="relative ml-1.5">
      <button
        type="button"
        aria-label="Mais informações sobre os Pilares da Geekie"
        aria-describedby={show ? tooltipId : undefined}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="text-[var(--color-text-tertiary)] text-sm cursor-help select-none p-2 -m-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:rounded-full"
      >
        <span aria-hidden="true">ⓘ</span>
      </button>
      {show && (
        <div
          id={tooltipId}
          role="tooltip"
          className="absolute left-0 bottom-full mb-2 bg-gray-900 text-white text-xs rounded-xl p-4 w-80 z-30 leading-relaxed shadow-2xl animate-in fade-in duration-200 text-left pointer-events-none"
        >
          {text}
        </div>
      )}
    </span>
  );
}

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

function getPilarMaisForte(pilares: Scores['pilares']): { nome: string; score: number } {
  const melhor = CARDS.reduce(
    (acc, card) => {
      const score = pilares[card.key];
      return score > acc.score ? { nome: card.nome, score } : acc;
    },
    { nome: CARDS[0].nome, score: pilares[CARDS[0].key] }
  );
  return melhor;
}

export function ResultadoPilares({ pilares }: Props) {
  const pilarForte = getPilarMaisForte(pilares);

  return (
    <section
      aria-labelledby="pilares-heading"
      className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
    >
      <div className="mb-6">
        <div className="flex items-center">
          <h2 id="pilares-heading" className="text-lg font-bold text-[var(--color-geekie-preto)]">
            Pilares da Geekie
          </h2>
          <InfoTooltip text="A metodologia Geekie organiza a inovação educacional em 4 pilares interdependentes — Aprendizagem Ativa, Visibilidade, Flexibilidade e Personalização — derivados de evidências sobre o que diferencia escolas com alta maturidade pedagógica. Cada pilar é avaliado por 5 perguntas que cobrem tanto práticas docentes quanto o uso intencional de tecnologia, gerando um score de 0 a 100 que reflete a consistência institucional da dimensão, não iniciativas isoladas." />
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Os 4 pilares medem dimensões complementares da inovação educacional. Juntos, revelam como
          sua escola integra pedagogia e tecnologia de forma intencional.
        </p>
      </div>

      {/* Âncora positiva: pilar mais forte antes da comparação — reduz reação defensiva (UX-3.2) */}
      <div className="mb-6 flex items-center gap-2 rounded-2xl bg-[var(--color-geekie-cereja)]/5 border border-[var(--color-geekie-cereja)]/15 px-5 py-3">
        <span className="text-[var(--color-geekie-cereja)] font-bold text-base" aria-hidden="true">
          ✦
        </span>
        <p className="text-sm text-[var(--color-geekie-preto)]">
          <span className="font-semibold text-[var(--color-geekie-cereja)]">
            Maior consistência:
          </span>{' '}
          {pilarForte.nome} — <span className="font-bold">{pilarForte.score}/100</span>
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
                  <span className="text-xs text-[var(--color-text-tertiary)] ml-2">
                    {PILAR_DESC[c.id]}
                  </span>
                </div>
                <span
                  className="text-xl font-extrabold flex-shrink-0 ml-4"
                  style={{ color: c.cor }}
                >
                  {score}
                  <span className="text-xs text-[var(--color-text-tertiary)] font-normal">
                    /100
                  </span>
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
    </section>
  );
}
