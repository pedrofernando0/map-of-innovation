import React from 'react';
import { Button } from '../components/ui';

interface InstrucaoProps {
  onNext: () => void;
  onBack: () => void;
}

export function Instrucao({ onNext, onBack }: InstrucaoProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12">
        <div className="flex items-center justify-center w-16 h-16 bg-orange-100 text-[var(--color-geekie-laranja)] rounded-full mb-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-geekie-preto)] mb-6">
          Como funciona o Mapa
        </h1>

        <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-12">
          <p>
            O Mapa de Inovação não é uma prova. Não existem respostas certas ou erradas.
          </p>
          <p>
            O objetivo é entender como a sua escola integra <strong className="text-[var(--color-geekie-preto)]">práticas pedagógicas</strong> e o uso de <strong className="text-[var(--color-geekie-preto)]">tecnologia</strong> no dia a dia.
          </p>
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="font-bold text-[var(--color-geekie-preto)] mb-3">Dicas para responder:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-geekie-cereja)] mt-1">✦</span>
                <span>Responda com base na <strong>realidade atual</strong> da escola, não nos planos futuros.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-geekie-cereja)] mt-1">✦</span>
                <span>Pense na prática <strong>institucional</strong>, não apenas em iniciativas isoladas de um ou outro professor.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onBack} size="lg">
            ← Voltar
          </Button>
          <Button onClick={onNext} size="lg">
            Entendi, vamos começar
          </Button>
        </div>
      </div>
    </div>
  );
}
