import React from 'react';

import type { Scores } from '../types';

interface Props {
  nivel: Scores['nivel'];
}

// Frase final variável por nível — a última coisa que o usuário lê e carrega (UX-4.2)
const FRASE_NIVEL: Record<string, string> = {
  ESSENCIAL: 'Toda jornada começa com um mapa. Você tem o seu.',
  EXPLORADOR: 'O caminho está aberto. A próxima etapa é sistematizar.',
  INTEGRADA: 'Você já chegou longe. O próximo passo é ir mais fundo.',
};

/**
 * Ritual de encerramento da experiência (closure emocional — Gestalt / UX-4.2).
 * Três elementos:
 * 1. Reconhecimento do esforço (fixo)
 * 2. Expectativa concreta do próximo contato (fixo)
 * 3. Frase que o usuário carrega (variável por nível)
 */
export function ClosingStatement({ nivel }: Props) {
  const frase = FRASE_NIVEL[nivel] ?? FRASE_NIVEL['EXPLORADOR'];

  return (
    <div className="rounded-2xl border border-[#f0e1e5] bg-[#fff9f7] p-6 space-y-4">
      <div className="space-y-2 text-sm text-gray-600 leading-relaxed">
        <p>Você dedicou tempo para olhar com honestidade para a sua escola.</p>
        <p>
          Nos próximos dias, um pedagogo da Geekie vai ler este diagnóstico antes de entrar em
          contato — a conversa parte daqui, não de um roteiro genérico.
        </p>
      </div>
      <p className="text-base font-semibold text-[var(--color-geekie-cereja)] leading-snug">
        {frase}
      </p>
    </div>
  );
}
