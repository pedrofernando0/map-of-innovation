import React, { useState } from 'react';
import { ATIVACOES_BETT, ATIVACAO_THRESHOLD, AtivacoesPilar } from '../constants';
import { Scores } from '../types';

interface BettAtivacoesProps {
  scores: Scores;
}

// Lançamento = produto/feature inteiramente novo, nunca existiu antes
// Novidade 2026 = evolução/melhoria de algo já existente
// Expansão = ampliação de alcance de algo já validado
// Destaque = seleção editorial (sem implicação de novidade)
const TAG_STYLES: Record<string, string> = {
  'Lançamento':    'bg-[#ff1547] text-white border border-[#ff1547]',           // cereja sólido — máximo destaque
  'Expansão':      'bg-[#ffc300] text-[#7a5000] border border-[#ffc300]',       // amarelo — novo território
  'Novidade 2026': 'bg-white text-[#6146f1] border border-[#6146f1]',           // contorno roxo — atualização
  'Destaque':      'bg-gray-100 text-gray-600 border border-gray-200',          // neutro — curadoria editorial
};

const TAG_DESC: Record<string, string> = {
  'Lançamento':    'Novo em 2026',
  'Expansão':      'Expansão de produto',
  'Novidade 2026': 'Evolução 2026',
  'Destaque':      'Destaque editorial',
};

// Ordenação: Lançamento > Expansão > Novidade 2026 > Destaque
const TAG_ORDEM: Record<string, number> = { 'Lançamento': 0, 'Expansão': 1, 'Novidade 2026': 2, 'Destaque': 3 };

function PilarCard({ data }: { data: AtivacoesPilar }) {
  const [aberto, setAberto] = useState(false);

  return (
    <div
      className="rounded-2xl border-2 overflow-hidden transition-all duration-300"
      style={{ borderColor: data.corPilar + '40', backgroundColor: data.corFundo }}
    >
      {/* Header do pilar — sempre visível */}
      <button
        onClick={() => setAberto(a => !a)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{data.icone}</span>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">
              Oportunidade identificada
            </div>
            <h3 className="text-base font-extrabold" style={{ color: data.corPilar }}>
              {data.pilar}
            </h3>
          </div>
        </div>
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg transition-transform duration-300"
          style={{
            backgroundColor: data.corPilar,
            transform: aberto ? 'rotate(45deg)' : 'rotate(0deg)'
          }}
        >
          +
        </div>
      </button>

      {/* Conteúdo expansível */}
      {aberto && (
        <div className="px-5 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-sm text-gray-600 leading-relaxed border-t pt-4" style={{ borderColor: data.corPilar + '30' }}>
            {data.intro}
          </p>

          <div className="space-y-3">
            {[...data.ativacoes].sort((a, b) => (TAG_ORDEM[a.tag] ?? 9) - (TAG_ORDEM[b.tag] ?? 9)).map((atv, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 shadow-sm border"
                style={{ borderColor: data.corPilar + '25' }}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border whitespace-nowrap ${TAG_STYLES[atv.tag]}`}>
                        {atv.tag}
                      </span>
                      <span className="text-[10px] text-gray-400">{TAG_DESC[atv.tag]}</span>
                    </div>
                    <h4 className="font-bold text-sm text-[var(--color-geekie-preto)] leading-snug">
                      {atv.titulo}
                    </h4>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {atv.descricao}
                </p>
                <div
                  className="flex items-start gap-2 text-sm rounded-lg p-3"
                  style={{ backgroundColor: data.corPilar + '12' }}
                >
                  <span className="flex-shrink-0 font-bold mt-0.5" style={{ color: data.corPilar }}>→</span>
                  <span className="text-gray-700 leading-relaxed">
                    <strong style={{ color: data.corPilar }}>Como sua escola pode evoluir:</strong> {atv.impacto}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl p-4 text-center" style={{ backgroundColor: data.corPilar + '15', border: `1.5px solid ${data.corPilar}40` }}>
            <p className="text-sm font-bold" style={{ color: data.corPilar }}>
              Converse com nosso consultor na Bett para conhecer essas soluções em detalhe e como aplicá-las na sua escola.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function BettAtivacoes({ scores }: BettAtivacoesProps) {
  const pilaresComOportunidade = Object.entries(scores.pilares)
    .filter(([, valor]) => valor < ATIVACAO_THRESHOLD)
    .sort(([, a], [, b]) => a - b) // do mais baixo para o mais alto
    .map(([chave]) => chave);

  if (pilaresComOportunidade.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 no-print">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[var(--color-geekie-cereja)] text-xl">✦</span>
        <h2 className="text-xl font-bold text-[var(--color-geekie-preto)]">
          Conheça na Bett 2026
        </h2>
        <span className="ml-auto bg-[#fff5f7] text-[#ff1547] border border-[#ffd0d9] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Ao vivo no estande
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-6 ml-8">
        Com base no diagnóstico da sua escola, selecionamos experiências que podem acelerar sua evolução nos pilares com maior oportunidade de crescimento.
      </p>

      <div className="space-y-3">
        {pilaresComOportunidade.map(chave => {
          const data = ATIVACOES_BETT[chave];
          if (!data) return null;
          return <PilarCard key={chave} data={data} />;
        })}
      </div>
    </div>
  );
}
