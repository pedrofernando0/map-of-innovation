import React, { useEffect, useState, memo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Button, Badge, ProgressBar } from '../components/ui';
import { CategoryIndicator } from '../components/CategoryIndicator';
import { BettAtivacoes } from '../components/BettAtivacoes';
import { AppState } from '../types';

interface ResultadoProps {
  appState: AppState;
  onNext: () => void;
}

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

export function Resultado({ appState, onNext }: ResultadoProps) {
  const { escola, scores, diagnostico, ancora } = appState;
  const [showPrintMessage, setShowPrintMessage] = useState(false);

  const radarData = [
    { subject: 'Aprendizagem Ativa', A: scores.pilares.aprendizagem_ativa },
    { subject: 'Visibilidade', A: scores.pilares.visibilidade },
    { subject: 'Flexibilidade', A: scores.pilares.flexibilidade },
    { subject: 'Personalização', A: scores.pilares.personalizacao }
  ];

  const cards = [
    { id: 'aa', nome: 'Aprendizagem Ativa', score: scores.pilares.aprendizagem_ativa, color: 'var(--color-geekie-cereja)' },
    { id: 'vis', nome: 'Visibilidade', score: scores.pilares.visibilidade, color: 'var(--color-geekie-azul)' },
    { id: 'flex', nome: 'Flexibilidade', score: scores.pilares.flexibilidade, color: 'var(--color-geekie-verde)' },
    { id: 'pers', nome: 'Personalização', score: scores.pilares.personalizacao, color: 'var(--color-geekie-roxo)' }
  ];

  const handlePrint = () => {
    setShowPrintMessage(true);
    setTimeout(() => setShowPrintMessage(false), 5000);
  };

  return (
    <div className="screen-resultado max-w-7xl mx-auto px-4 py-8 md:py-12 animate-in fade-in duration-500">
      <div className="mb-12 text-center">
        <Badge nivel={scores.nivel} className="mb-4" />
        <h1 className="text-4xl font-bold text-[var(--color-geekie-preto)] mb-2">{escola.nome}</h1>
        <p className="text-gray-500 text-lg">{escola.cidade} / {escola.estado}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* COLUNA ESQUERDA */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Radar de Inovação</h3>
            <div className="h-64 md:h-80 w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#e0e0e0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#1c1c1c', fontSize: 12, fontWeight: 600, fontFamily: 'Mulish' }} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Radar name="Score" dataKey="A" stroke="#ff1547" strokeWidth={2} fill="rgba(255, 21, 71, 0.15)" isAnimationActive={true} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Eixos de Inovação</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-1">
                    <span>Eixo Pedagógico</span>
                    <span className="text-[var(--color-geekie-cereja)]">{scores.eixos.pedagogico}</span>
                  </div>
                  <ProgressBar progress={scores.eixos.pedagogico} />
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold mb-1">
                    <span>Eixo Tecnológico</span>
                    <span className="text-[var(--color-geekie-cereja)]">{scores.eixos.tecnologico}</span>
                  </div>
                  <ProgressBar progress={scores.eixos.tecnologico} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Nível de Maturidade</h3>
            <CategoryIndicator score={scores.total} />
            <div className="mt-6 flex gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2 group relative">
                <span>Auto-percepção:</span>
                <span className="font-bold text-[var(--color-geekie-preto)]">{ancora}/4</span>
                <div className="cursor-help text-gray-400">ⓘ</div>
                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48 z-10">
                  O nível que você selecionou no início do questionário (1 a 4).
                </div>
              </div>
              <div className="flex items-center gap-2 group relative">
                <span>Score medido:</span>
                <span className="font-bold text-[var(--color-geekie-cereja)]">{scores.total}/100</span>
                <div className="cursor-help text-gray-400">ⓘ</div>
                <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 w-48 z-10">
                  A pontuação calculada com base nas suas respostas (0 a 100).
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Pilares da Geekie</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cards.map((c, i) => (
                  <div 
                    key={c.id} 
                    className="bg-gray-50 p-4 rounded-2xl border border-gray-100 animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-both"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <h3 className="font-bold text-gray-600 text-xs mb-2">{c.nome}</h3>
                    <div className="text-2xl font-extrabold text-[var(--color-geekie-cereja)] mb-2">{c.score}</div>
                    <ProgressBar progress={c.score} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <BettAtivacoes scores={scores} />

          <div className="diagnostico-container bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex flex-col gap-2 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-[var(--color-geekie-cereja)] text-xl">✦</span>
                <h2 className="text-xl font-bold text-[var(--color-geekie-preto)]">Diagnóstico personalizado</h2>
                <span className="ml-auto bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Metodologia Geekie
                </span>
              </div>
            </div>
            
            <div className="prose prose-lg prose-red max-w-none text-gray-700 leading-relaxed min-h-[300px]">
              <TypingMarkdown text={diagnostico} />
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4 no-print">
            {showPrintMessage && (
              <div className="bg-green-50 text-green-800 p-4 rounded-lg text-center font-medium animate-in fade-in slide-in-from-bottom-2">
                O relatório completo será enviado em até 24h para o e-mail preenchido ({escola.contato_email}).
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="secondary" onClick={handlePrint} className="flex-1">
                Receber meu relatório
              </Button>
              <Button onClick={onNext} className="flex-1" size="lg">
                Falar com meu consultor →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
