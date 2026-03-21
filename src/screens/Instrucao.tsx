import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/ui';
import { useAppStore } from '../stores/appStore';

export function Instrucao() {
  const navigate = useNavigate();
  const { setProgress } = useAppStore();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12">
        <div
          className="flex items-center justify-center w-16 h-16 bg-orange-100 text-[var(--color-geekie-laranja)] rounded-full mb-8"
          aria-hidden="true"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
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
            O Mapa de Inovação foi desenvolvido por um{' '}
            <strong className="text-[var(--color-geekie-preto)]">
              time interdisciplinar da Geekie
            </strong>{' '}
            — pedagogos, especialistas em educação e cientistas de dados — com o propósito de aferir
            o grau de inovação educacional dentro do ambiente escolar.
          </p>
          <p>
            O objetivo é entender como a sua escola integra{' '}
            <strong className="text-[var(--color-geekie-preto)]">práticas pedagógicas</strong> e o
            uso de <strong className="text-[var(--color-geekie-preto)]">tecnologia</strong> de forma
            intencional e sistêmica.
          </p>

          <div className="bg-[#fff5f7] border border-[#ffd0d9] p-5 rounded-xl">
            <div className="flex items-start gap-3">
              <span className="text-[var(--color-geekie-cereja)] text-xl mt-0.5" aria-hidden="true">
                ⓘ
              </span>
              <div>
                <h3 className="font-bold text-[var(--color-geekie-preto)] mb-1 text-base">
                  Versão reduzida — Bett Brasil 2026
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Esta versão avalia <strong>1 das 5 categorias</strong> do instrumento completo:{' '}
                  <em>Currículo e organização da aprendizagem</em>. Na versão integral, outras 4
                  categorias ampliam a abrangência do diagnóstico. Após o preenchimento, nosso
                  consultor pode apresentar o instrumento completo.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="font-bold text-[var(--color-geekie-preto)] mb-3">Como responder:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-geekie-cereja)] mt-1" aria-hidden="true">
                  ✦
                </span>
                <span>
                  Responda com base na <strong>realidade atual</strong> da escola, não nos planos
                  futuros.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-geekie-cereja)] mt-1" aria-hidden="true">
                  ✦
                </span>
                <span>
                  Pense na prática <strong>institucional</strong>, não apenas em iniciativas
                  isoladas de um ou outro professor.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              setProgress(10);
              navigate('/cadastro');
            }}
            size="lg"
          >
            ← Voltar
          </Button>
          <Button
            onClick={() => {
              setProgress(30);
              navigate('/ancora');
            }}
            size="lg"
          >
            Entendi, vamos começar
          </Button>
        </div>
      </div>
    </div>
  );
}
