import React, { useEffect, useState, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { Button } from '../ui';

const TypingMarkdown = memo(({ text }: { text: string }) => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setTypedText(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 2);
    return () => clearInterval(timer);
  }, [text]);

  return <ReactMarkdown rehypePlugins={[rehypeRaw]}>{typedText}</ReactMarkdown>;
});

interface Props {
  diagnostico: string;
  onPrint: () => void;
  onContinue: () => void;
}

export function ResultadoDiagnostico({ diagnostico, onPrint, onContinue }: Props) {
  return (
    <section
      aria-labelledby="diagnostico-heading"
      className="diagnostico-container bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
    >
      <div className="flex items-center gap-3 mb-2 pb-6 border-b border-gray-100">
        <span className="text-[var(--color-geekie-cereja)] text-xl" aria-hidden="true">
          ✦
        </span>
        <h2 id="diagnostico-heading" className="text-xl font-bold text-[var(--color-geekie-preto)]">
          Diagnóstico personalizado
        </h2>
        <span className="ml-auto bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Metodologia Geekie
        </span>
      </div>

      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-6 mb-1">
        Categoria avaliada (versão pocket — Bett Brasil 2026)
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Currículo e organização da aprendizagem{' '}
        <span className="text-gray-400">(1 de 5 categorias do instrumento completo)</span>
      </p>

      <div className="prose prose-lg prose-red max-w-none text-gray-700 leading-relaxed text-justify min-h-[200px]">
        <TypingMarkdown text={diagnostico} />
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 no-print space-y-3">
        <Button variant="secondary" onClick={onPrint} className="w-full">
          Salvar versão para impressão
        </Button>
        <Button onClick={onContinue} className="w-full" size="lg">
          Quero receber meu relatório →
        </Button>
      </div>
    </section>
  );
}
