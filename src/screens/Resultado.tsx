import React, { useEffect, useState, memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Cell, LabelList, ResponsiveContainer, Tooltip } from 'recharts';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Button, Badge } from '../components/ui';
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

const PILAR_DESC: Record<string, string> = {
  aa:   'Metodologias ativas e protagonismo do estudante',
  vis:  'Avaliação, dados e feedback formativo',
  flex: 'Autonomia curricular e adaptação ao contexto',
  pers: 'Diferenciação e percursos individualizados',
};

export function Resultado({ appState, onNext }: ResultadoProps) {
  const { escola, scores, diagnostico, ancora } = appState;
  const [showPrintMessage, setShowPrintMessage] = useState(false);

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
      <div className="bg-[var(--color-geekie-cereja)] rounded-3xl p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <p className="text-sm font-bold uppercase tracking-wider mb-2 opacity-75">Mapa de Inovação Educacional — Diagnóstico</p>
            <h1 className="text-4xl font-extrabold mb-2 leading-tight">{escola.nome}</h1>
            <p className="text-base opacity-80">{escola.cidade}{escola.estado ? ` / ${escola.estado}` : ''} · {escola.rede}</p>
            {ancora && (
              <p className="text-sm opacity-70 mt-2">Auto-percepção declarada: <strong className="opacity-100">{ancora}/3</strong></p>
            )}
          </div>
          <div className="flex flex-col items-center md:items-end gap-3 flex-shrink-0">
            <Badge nivel={scores.nivel} className="bg-white bg-opacity-20 border border-white border-opacity-40 text-white" />
            <p className="text-sm font-bold uppercase tracking-wider opacity-75">Perfil de Inovação</p>
            <p className="text-6xl font-extrabold leading-none">
              {scoreGeral}<span className="text-2xl font-normal opacity-60">/100</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── 2. Pilares — gráfico de barras horizontais ── */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-[var(--color-geekie-preto)]">Pilares da Geekie</h3>
          <p className="text-sm text-gray-500 mt-1">Os 4 pilares medem dimensões complementares da inovação educacional. Juntos, revelam como sua escola integra pedagogia e tecnologia de forma intencional.</p>
        </div>

        {/* Barras horizontais — proporção exata, legível */}
        <div className="space-y-5">
          {cards.map((c, i) => {
            const displayScore = Math.max(c.score, 4); // mínimo visual de 4%
            return (
              <div key={c.id} className="animate-in slide-in-from-left-4 fade-in duration-500 fill-mode-both" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-baseline justify-between mb-1.5">
                  <div>
                    <span className="text-sm font-bold" style={{ color: c.cor }}>{c.nome}</span>
                    <span className="text-xs text-gray-400 ml-2">{PILAR_DESC[c.id]}</span>
                  </div>
                  <span className="text-xl font-extrabold flex-shrink-0 ml-4" style={{ color: c.cor }}>{c.score}<span className="text-xs text-gray-400 font-normal">/100</span></span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-4 rounded-full transition-all duration-700"
                    style={{ width: `${displayScore}%`, backgroundColor: c.cor, opacity: 0.85 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 3. Eixos (espectro) + Perfil de Inovação (CategoryIndicator) ── */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8">
        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Eixos de Inovação</h3>
          <div className="space-y-10">
            <EixoEspectro
              label="Eixo Geral"
              score={scoreGeral}
              extremoEsquerdo="Tradicional"
              extremoDireito="Inovadora"
              cor="#ff1547"
              isMain
              tooltip="Resultado combinado da inovação pedagógica e tecnológica da sua escola — dois eixos avaliados de forma independente e integrados nesta pontuação única."
            />
            <div className="space-y-8 pt-2">
              <EixoEspectro
                label="Eixo Pedagógico"
                score={scores.eixos.pedagogico}
                extremoEsquerdo="Transmissivo"
                extremoDireito="Protagonista"
                cor="#6146f1"
                tooltip="Mede a transformação intencional das práticas de ensino, aprendizagem, avaliação e formação docente em direção ao protagonismo do estudante."
              />
              <EixoEspectro
                label="Eixo Tecnológico"
                score={scores.eixos.tecnologico}
                extremoEsquerdo="Analógica"
                extremoDireito="Conectada"
                cor="#FF8219"
                tooltip="Mede a incorporação intencional de recursos digitais ao fluxo pedagógico. O indicador não é 'a escola tem plataforma', mas 'a plataforma faz parte da rotina'."
              />
            </div>
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

        <div className="mt-8 pt-6 border-t border-gray-100 no-print space-y-3">
          {showPrintMessage && (
            <div className="bg-green-50 text-green-800 p-4 rounded-xl text-center font-medium animate-in fade-in slide-in-from-bottom-2">
              O relatório completo será enviado em até 24h para {escola.contato_email}.
            </div>
          )}
          <Button variant="secondary" onClick={handlePrint} className="w-full">
            Receber meu relatório
          </Button>
          <Button onClick={onNext} className="w-full" size="lg">
            Quero ser uma escola mais inovadora →
          </Button>
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
