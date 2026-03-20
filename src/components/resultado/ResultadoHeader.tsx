import React from 'react';

import { Badge } from '../ui';
import type { Escola, Scores } from '../../types';

interface Props {
  escola: Escola;
  scores: Scores;
  ancora: number | null;
}

export function ResultadoHeader({ escola, scores, ancora }: Props) {
  return (
    <div className="bg-[var(--color-geekie-cereja)] rounded-3xl p-8 text-white shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <p className="text-sm font-bold uppercase tracking-wider mb-2 opacity-75">
            Mapa de Inovação Educacional — Diagnóstico
          </p>
          <h1 className="text-4xl font-extrabold mb-2 leading-tight">{escola.nome}</h1>
          <p className="text-base opacity-80">
            {escola.cidade}
            {escola.estado ? ` / ${escola.estado}` : ''} · {escola.rede}
          </p>
          {ancora && (
            <p className="text-sm opacity-70 mt-2">
              Auto-percepção declarada: <strong className="opacity-100">{ancora}/3</strong>
            </p>
          )}
        </div>
        <div className="flex flex-col items-center md:items-end gap-3 flex-shrink-0">
          <Badge
            nivel={scores.nivel}
            className="bg-white bg-opacity-20 border border-white border-opacity-40 text-white"
          />
          <p className="text-sm font-bold uppercase tracking-wider opacity-75">
            Perfil de Inovação
          </p>
          <p className="text-6xl font-extrabold leading-none">
            {scores.total}
            <span className="text-2xl font-normal opacity-60">/100</span>
          </p>
        </div>
      </div>
    </div>
  );
}
