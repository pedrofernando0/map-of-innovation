import type { Scores } from '../../types';

import { QUESTOES_METADATA } from './questoes-metadata';

/** Normaliza uma soma de respostas (1–4) para a escala 0–100. */
function calcPercentage(sum: number, count: number): number {
  if (count === 0) return 0;
  return Math.round(((sum - count) / (count * 3)) * 100);
}

/**
 * Calcula todos os scores a partir das respostas brutas.
 *
 * Ponderação: 80% eixo pedagógico + 20% eixo tecnológico.
 * Níveis: ESSENCIAL (0–40) | EXPLORADOR (41–70) | INTEGRADA (71–100).
 */
export function calculateScores(respostas: Record<string, number>): Scores {
  const pilarSum = { aprendizagem_ativa: 0, visibilidade: 0, flexibilidade: 0, personalizacao: 0 };
  const pilarCount = {
    aprendizagem_ativa: 0,
    visibilidade: 0,
    flexibilidade: 0,
    personalizacao: 0,
  };
  const eixoSum = { pedagogico: 0, tecnologico: 0 };
  const eixoCount = { pedagogico: 0, tecnologico: 0 };

  for (const q of QUESTOES_METADATA) {
    const val = respostas[q.id];
    if (val) {
      pilarSum[q.pilar as keyof typeof pilarSum] += val;
      pilarCount[q.pilar as keyof typeof pilarCount] += 1;
      eixoSum[q.eixo as keyof typeof eixoSum] += val;
      eixoCount[q.eixo as keyof typeof eixoCount] += 1;
    }
  }

  const pedScore = calcPercentage(eixoSum.pedagogico, eixoCount.pedagogico);
  const tecScore = calcPercentage(eixoSum.tecnologico, eixoCount.tecnologico);
  const total = Math.round(pedScore * 0.8 + tecScore * 0.2);

  const NIVEL_RULES: Array<{ min: number; nivel: Scores['nivel'] }> = [
    { min: 71, nivel: 'INTEGRADA' },
    { min: 41, nivel: 'EXPLORADOR' },
    { min: 0, nivel: 'ESSENCIAL' },
  ];

  const nivel = NIVEL_RULES.find((r) => total >= r.min)?.nivel ?? 'ESSENCIAL';

  return {
    pilares: {
      aprendizagem_ativa: calcPercentage(
        pilarSum.aprendizagem_ativa,
        pilarCount.aprendizagem_ativa
      ),
      visibilidade: calcPercentage(pilarSum.visibilidade, pilarCount.visibilidade),
      flexibilidade: calcPercentage(pilarSum.flexibilidade, pilarCount.flexibilidade),
      personalizacao: calcPercentage(pilarSum.personalizacao, pilarCount.personalizacao),
    },
    eixos: { pedagogico: pedScore, tecnologico: tecScore },
    total,
    nivel,
  };
}
