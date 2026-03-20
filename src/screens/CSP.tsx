import React from 'react';
import { Button } from '../components/ui';
import { GeekieLogo } from '../components/GeekieLogo';
import { AppState } from '../types';

interface CSPProps {
  appState: AppState;
  onBack?: () => void;
  onReset?: () => void;
}

export function CSP({ appState, onBack, onReset }: CSPProps) {
  const nextSteps = [
    {
      title: 'Leitura do contexto escolar',
      description: 'A equipe Geekie parte deste diagnostico para compreender a etapa de ensino, a organizacao curricular e os desafios mais presentes na rotina da sua escola.'
    },
    {
      title: 'Devolutiva pedagogica',
      description: 'O contato tem como foco aprofundar o significado dos resultados, destacando forcas, pontos de atencao e prioridades possiveis para o proximo ciclo.'
    },
    {
      title: 'Aplicacao a realidade da escola',
      description: 'A conversa busca traduzir o diagnostico em encaminhamentos aderentes ao contexto institucional, sem receitas prontas ou propostas desconectadas da pratica.'
    }
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="max-w-3xl w-full mx-auto space-y-4">

        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--color-geekie-cereja)] transition-colors font-medium"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            Voltar ao relatorio
          </button>
        )}

        <div className="rounded-[2rem] border border-[#f2d8de] bg-[linear-gradient(180deg,#fff9f7_0%,#ffffff_100%)] p-8 md:p-12 shadow-[0_28px_80px_-48px_rgba(28,28,28,0.35)]">
          <div className="flex justify-center mb-6">
            <GeekieLogo className="h-10 object-contain" />
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-geekie-cereja)]">
            Devolutiva pedagogica Geekie
          </div>

          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-geekie-preto)] mb-5">
              O proximo passo e compreender a realidade da sua escola com mais profundidade
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              Ao solicitar o relatorio, a Geekie entrara em contato para compreender o contexto da sua escola, aprofundar a leitura deste diagnostico e discutir como aplicar os achados a rotina pedagogica especifica da instituicao.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {nextSteps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-white bg-white/80 p-5 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-geekie-cereja)]/10 text-sm font-bold text-[var(--color-geekie-cereja)]">
                  {index + 1}
                </div>
                <h2 className="text-base font-bold text-[var(--color-geekie-preto)] mb-2">{step.title}</h2>
                <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[#f3e7ea] bg-white/75 p-6 text-left">
            <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-gray-400 mb-3">Como a continuidade acontece</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              O retorno considera os dados preenchidos por <strong>{appState.escola.contato_nome || 'sua escola'}</strong> e o e-mail <strong>{appState.escola.contato_email || 'informado no cadastro'}</strong>, para que a conversa parta do diagnostico ja realizado e avance com foco pedagogico.
            </p>
          </div>

          {onReset && (
            <div className="mt-10 flex justify-end pt-6 border-t border-[#f0e1e5]">
              <Button onClick={onReset} size="lg">
                Encerrar diagnostico
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
