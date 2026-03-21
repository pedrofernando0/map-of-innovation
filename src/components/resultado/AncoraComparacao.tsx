import React from 'react';

import type { Scores } from '../../types';

interface Props {
  ancora: number | null;
  nivelReal: Scores['nivel'];
}

// ancora: 1=ESSENCIAL, 2=EXPLORADOR, 3=INTEGRADA
const ANCORA_NIVEL: Record<number, Scores['nivel']> = {
  1: 'ESSENCIAL',
  2: 'EXPLORADOR',
  3: 'INTEGRADA',
};

// Ordem de níveis para comparação: ESSENCIAL < EXPLORADOR < INTEGRADA
const NIVEL_ORDEM: Record<string, number> = {
  ESSENCIAL: 1,
  EXPLORADOR: 2,
  INTEGRADA: 3,
};

function getMensagem(ancoraNum: number, nivelReal: Scores['nivel']): string {
  const nivelAncora = ANCORA_NIVEL[ancoraNum];
  const ordemAncora = NIVEL_ORDEM[nivelAncora] ?? 0;
  const ordemReal = NIVEL_ORDEM[nivelReal] ?? 0;

  if (ordemAncora === ordemReal) {
    return 'A percepção institucional está alinhada ao que o diagnóstico mediu.';
  }
  if (ordemAncora > ordemReal) {
    // Ancora mais alta que real: o instrumento identificou oportunidades de desenvolvimento
    return 'O instrumento identificou oportunidades de desenvolvimento que a percepção inicial não capturou — um dado relevante para a reflexão pedagógica.';
  }
  // Ancora mais baixa que real: a escola está mais avançada do que percebia
  return 'Sua escola demonstra mais avanço do que a percepção inicial indicava. Há práticas já consolidadas que merecem ser reconhecidas e ampliadas.';
}

function getAncoraLabel(val: number): string {
  if (val === 1) return 'Essencial';
  if (val === 2) return 'Explorador';
  return 'Integrada';
}

/**
 * Exibe a comparação entre a auto-percepção declarada na Ancora
 * e o nível real medido pelo diagnóstico.
 * Renderizado apenas quando ancora !== null.
 * Tom: neutro-positivo em todos os casos (nunca "você estava errado").
 */
export function AncoraComparacao({ ancora, nivelReal }: Props) {
  if (!ancora || !nivelReal) return null;

  const nivelAncoraLabel = getAncoraLabel(ancora);
  const nivelRealLabel = nivelReal.charAt(0).toUpperCase() + nivelReal.slice(1).toLowerCase();
  const mensagem = getMensagem(ancora, nivelReal);

  return (
    <div
      className="rounded-2xl border border-gray-100 bg-white shadow-sm px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-4"
      role="note"
      aria-label="Comparação entre auto-percepção e diagnóstico"
    >
      <div className="flex items-center gap-4 flex-1 flex-wrap text-sm text-gray-600">
        <span>
          <span className="text-[var(--color-text-tertiary)] font-medium">Estimativa inicial:</span>{' '}
          <strong className="text-[var(--color-geekie-preto)]">{nivelAncoraLabel}</strong>
        </span>
        <span className="hidden sm:inline text-gray-300" aria-hidden="true">
          ·
        </span>
        <span>
          <span className="text-[var(--color-text-tertiary)] font-medium">Resultado medido:</span>{' '}
          <strong className="text-[var(--color-geekie-preto)]">{nivelRealLabel}</strong>
        </span>
      </div>
      <p className="text-sm text-gray-500 italic sm:text-right sm:max-w-xs leading-snug">
        {mensagem}
      </p>
    </div>
  );
}
