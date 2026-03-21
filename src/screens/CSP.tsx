import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/ui';
import { GeekieLogo } from '../components/GeekieLogo';
import { ClosingStatement } from '../components/ClosingStatement';
import { useAppStore } from '../stores/appStore';
import { CSP_COPY } from '../constants';

export function CSP() {
  const navigate = useNavigate();
  const { escola, scores, reset, setProgress } = useAppStore();
  const [isLeaving, setIsLeaving] = useState(false);

  // C4: fade de saída antes do reset — cria "ponto final" intencional (UX-4.3)
  function handleEncerrar() {
    setIsLeaving(true);
    setTimeout(() => {
      reset();
      navigate('/');
    }, 300);
  }

  // C1: título varia por nível via CSP_COPY (UX-4.1)
  const copy = CSP_COPY[scores.nivel as keyof typeof CSP_COPY] ?? CSP_COPY.EXPLORADOR;

  const nextSteps = [
    {
      title: 'Leitura do contexto escolar',
      description:
        'A equipe Geekie parte deste diagnóstico para compreender a etapa de ensino, a organização curricular e os desafios mais presentes na rotina da sua escola.',
    },
    {
      title: 'Devolutiva pedagógica',
      description:
        'O contato tem como foco aprofundar o significado dos resultados, destacando forças, pontos de atenção e prioridades possíveis para o próximo ciclo.',
    },
    {
      title: 'Aplicação à realidade da escola',
      description:
        'A conversa busca traduzir o diagnóstico em encaminhamentos aderentes ao contexto institucional, sem receitas prontas ou propostas desconectadas da prática.',
    },
  ];

  return (
    <div
      className="min-h-[80vh] flex flex-col items-center justify-center p-6 animate-in fade-in duration-500"
      style={{
        opacity: isLeaving ? 0 : 1,
        transition: isLeaving ? 'opacity 300ms cubic-bezier(0.22, 1, 0.36, 1)' : undefined,
      }}
    >
      <div className="max-w-3xl w-full mx-auto space-y-4">
        <button
          onClick={() => {
            setProgress(90);
            navigate('/resultado');
          }}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--color-geekie-cereja)] transition-colors font-medium py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:rounded-md"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Voltar ao relatório
        </button>

        <div className="rounded-[2rem] border border-[#f2d8de] bg-[linear-gradient(180deg,#fff9f7_0%,#ffffff_100%)] p-8 md:p-12 shadow-[0_28px_80px_-48px_rgba(28,28,28,0.35)]">
          <div className="flex justify-center mb-6">
            <GeekieLogo variant="color" className="h-10 object-contain" />
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-geekie-cereja)]">
            Devolutiva pedagógica Geekie
          </div>

          <div className="max-w-2xl">
            {/* C1: título varia por nível — linguagem de parceiro, não de vendedor (UX-4.1) */}
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-geekie-preto)] mb-5">
              {copy.titulo}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">{copy.subtitulo}</p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {nextSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-2xl border border-white bg-white/80 p-5 shadow-sm"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-geekie-cereja)]/10 text-sm font-bold text-[var(--color-geekie-cereja)]">
                  {index + 1}
                </div>
                <h2 className="text-base font-bold text-[var(--color-geekie-preto)] mb-2">
                  {step.title}
                </h2>
                <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[#f3e7ea] bg-white/75 p-6 text-left">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-text-tertiary)] mb-3">
              Como a continuidade acontece
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              O retorno considera os dados preenchidos por{' '}
              <strong>{escola.contato_nome || 'sua escola'}</strong> e o e-mail{' '}
              <strong>{escola.contato_email || 'informado no cadastro'}</strong>, para que a
              conversa parta do diagnóstico já realizado e avance com foco pedagógico.
            </p>
          </div>

          {/* C2: ClosingStatement — ritual de encerramento com closure emocional (UX-4.2) */}
          <ClosingStatement nivel={scores.nivel} />

          <div className="mt-6 flex justify-end pt-6 border-t border-[#f0e1e5]">
            {/* C3: "Liberar para a próxima escola" — contextualiza o reset como ato intencional (UX-4.3) */}
            <Button onClick={handleEncerrar} size="lg">
              Liberar para a próxima escola
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
