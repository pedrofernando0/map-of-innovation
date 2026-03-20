import React, { useEffect, useState, memo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Button, Badge, ProgressBar } from '../components/ui';
import { CategoryIndicator } from '../components/CategoryIndicator';
import { EixoEspectro } from '../components/EixoEspectro';
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

const NIVEL_COR: Record<string, string> = {
  ESSENCIAL: 'var(--color-geekie-amarelo)',
  EXPLORADOR: 'var(--color-geekie-azul)',
  INTEGRADA: 'var(--color-geekie-verde)',
};

export function Resultado({ appState, onNext }: ResultadoProps) {
  const { escola, scores, diagnostico, ancora } = appState;
  const [showPrintMessage, setShowPrintMessage] = useState(false);

  // R3: score mínimo de 5 para radar nunca ficar vazio em zero
  const radarData = [
    { subject: 'Aprendizagem Ativa', A: Math.max(scores.pilares.aprendizagem_ativa, 5) },
    { subject: 'Visibilidade',        A: Math.max(scores.pilares.visibilidade, 5) },
    { subject: 'Flexibilidade',       A: Math.max(scores.pilares.flexibilidade, 5) },
    { subject: 'Personalização',      A: Math.max(scores.pilares.personalizacao, 5) },
  ];

  const cards = [
    { id: 'aa',   nome: 'Aprendizagem Ativa', score: scores.pilares.aprendizagem_ativa, cor: '#ff1547' },
    { id: 'vis',  nome: 'Visibilidade',        score: scores.pilares.visibilidade,        cor: '#0fc3e6' },
    { id: 'flex', nome: 'Flexibilidade',       score: scores.pilares.flexibilidade,       cor: '#32cd91' },
    { id: 'pers', nome: 'Personalização',      score: scores.pilares.personalizacao,      cor: '#6146f1' },
  ];

  // Score geral ponderado 80/20 já está em scores.total
  const scoreGeral = scores.total;

  const handlePrint = () => {
    setShowPrintMessage(true);
    setTimeout(() => setShowPrintMessage(false), 5000);
  };

  return (
    <div className="screen-resultado max-w-5xl mx-auto px-4 py-8 md:py-12 animate-in fade-in duration-500 space-y-8">

      {/* ── 1. Identificação + Perfil de Inovação ── */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Diagnóstico — Mapa de Inovação</p>
            <h1 className="text-3xl font-bold text-[var(--color-geekie-preto)] mb-1">{escola.nome}</h1>
            <p className="text-gray-500">{escola.cidade}{escola.estado ? ` / ${escola.estado}` : ''} · {escola.rede}</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <Badge nivel={scores.nivel} />
            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Perfil de Inovação</p>
            <p className="text-4xl font-extrabold" style={{ color: NIVEL_COR[scores.nivel] || '#ff1547' }}>
              {scoreGeral}<span className="text-lg text-gray-400 font-normal">/100</span>
            </p>
            {ancora && (
              <p className="text-xs text-gray-400">Auto-percepção: <strong className="text-gray-600">{ancora}/4</strong></p>
            )}
          </div>
        </div>
      </div>

      {/* ── 2. Radar + Pilares ── */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Radar de Inovação</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#e0e0e0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#1c1c1c', fontSize: 12, fontWeight: 600, fontFamily: 'Mulish' }} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(v: number) => [Math.max(Number(v), 0) === 5 && v === 5 ? 0 : v, 'Score']} />
                <Radar name="Score" dataKey="A" stroke="#ff1547" strokeWidth={2} fill="rgba(255,21,71,0.12)" isAnimationActive />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {cards.map((c, i) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl border-2 animate-in slide-in-from-bottom-4 fade-in duration-500 fill-mode-both"
                style={{ borderColor: c.cor + '40', backgroundColor: c.cor + '0d', animationDelay: `${i * 80}ms` }}
              >
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: c.cor }}>{c.nome}</p>
                <p className="text-3xl font-extrabold" style={{ color: c.cor }}>{c.score}<span className="text-xs text-gray-400 font-normal ml-0.5">/100</span></p>
                <div className="mt-2">
                  <ProgressBar progress={c.score} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. Eixos (espectro) + Perfil de Inovação (CategoryIndicator) ── */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8">
        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Eixos de Inovação</h3>
          <div className="space-y-8">
            <EixoEspectro
              label="Eixo Geral"
              score={scoreGeral}
              extremoEsquerdo="Tradicional"
              extremoDireito="Inovadora"
              cor="#ff1547"
              tooltip="Score ponderado: 80% Pedagógico + 20% Tecnológico. Reflete a integração institucional entre práticas de ensino e uso de tecnologia."
            />
            <EixoEspectro
              label="Eixo Pedagógico"
              score={scores.eixos.pedagogico}
              extremoEsquerdo="Transmissivo"
              extremoDireito="Protagonista"
              cor="#6146f1"
              tooltip="Transformação intencional das práticas de ensino, aprendizagem, avaliação e formação docente em direção ao protagonismo do estudante. Representa 80% do score geral."
            />
            <EixoEspectro
              label="Eixo Tecnológico"
              score={scores.eixos.tecnologico}
              extremoEsquerdo="Analógica"
              extremoDireito="Digital integrada"
              cor="#0fc3e6"
              tooltip="Incorporação intencional de recursos digitais ao fluxo pedagógico. Mede-se pelo uso efetivo e integração à rotina, não pela presença de equipamentos. Representa 20% do score geral."
            />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Perfil de Inovação</h3>
          <CategoryIndicator score={scores.total} />
        </div>
      </div>

      {/* ── 4. Ativações Bett ── */}
      <BettAtivacoes scores={scores} />

      {/* ── 5. Diagnóstico personalizado + CTA ── */}
      <div className="diagnostico-container bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-2 pb-6 border-b border-gray-100">
          <span className="text-[var(--color-geekie-cereja)] text-xl">✦</span>
          <h2 className="text-xl font-bold text-[var(--color-geekie-preto)]">Diagnóstico personalizado</h2>
          <span className="ml-auto bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Metodologia Geekie
          </span>
        </div>

        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-6 mb-1">
          Categoria avaliada (versão pocket — Bett Brasil 2026)
        </div>
        <p className="text-sm text-gray-600 mb-6">Currículo e organização da aprendizagem <span className="text-gray-400">(1 de 5 categorias do instrumento completo)</span></p>

        <div className="prose prose-lg prose-red max-w-none text-gray-700 leading-relaxed text-justify min-h-[200px]">
          <TypingMarkdown text={diagnostico} />
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 no-print space-y-4">
          {showPrintMessage && (
            <div className="bg-green-50 text-green-800 p-4 rounded-xl text-center font-medium animate-in fade-in slide-in-from-bottom-2">
              O relatório completo será enviado em até 24h para {escola.contato_email}.
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="secondary" onClick={handlePrint} className="flex-1">
              Receber meu relatório
            </Button>
            <Button onClick={onNext} className="flex-1" size="lg">
              Quero ser uma escola mais inovadora →
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center no-print opacity-20 hover:opacity-100 transition-opacity">
        <button onClick={() => window.location.reload()} className="text-xs text-gray-400 hover:text-gray-600">
          Novo preenchimento (Reset)
        </button>
      </div>
    </div>
  );
}
