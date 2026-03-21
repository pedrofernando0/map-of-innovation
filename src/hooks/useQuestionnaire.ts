import { useState } from 'react';

import { QUESTOES } from '../constants';

const BLOCOS = [
  { titulo: 'Aprendizagem Ativa', qs: QUESTOES.slice(0, 5) },
  { titulo: 'Visibilidade', qs: QUESTOES.slice(5, 10) },
  { titulo: 'Flexibilidade', qs: QUESTOES.slice(10, 15) },
  { titulo: 'Personalização', qs: QUESTOES.slice(15, 20) },
] as const;

export interface UseQuestionnaireResult {
  blocoAtual: number;
  bloco: (typeof BLOCOS)[number];
  totalBlocos: number;
  todasRespondidas: boolean;
  pendentes: number;
  isLastBloco: boolean;
  handleNext: () => void;
  handleBack: () => void;
}

export function useQuestionnaire(
  respostas: Record<string, number>,
  onFinish: () => void,
  onBack: () => void
): UseQuestionnaireResult {
  const [blocoAtual, setBlocoAtual] = useState(0);

  const bloco = BLOCOS[blocoAtual];
  const respondidas = bloco.qs.filter((q) => respostas[q.id]).length;
  const todasRespondidas = respondidas === bloco.qs.length;
  const isLastBloco = blocoAtual === BLOCOS.length - 1;

  const handleNext = () => {
    if (!todasRespondidas) return;
    if (!isLastBloco) {
      setBlocoAtual((prev) => prev + 1);
    } else {
      onFinish();
    }
  };

  const handleBack = () => {
    if (blocoAtual > 0) {
      setBlocoAtual((prev) => prev - 1);
    } else {
      onBack();
    }
  };

  return {
    blocoAtual,
    bloco,
    totalBlocos: BLOCOS.length,
    todasRespondidas,
    pendentes: bloco.qs.length - respondidas,
    isLastBloco,
    handleNext,
    handleBack,
  };
}
