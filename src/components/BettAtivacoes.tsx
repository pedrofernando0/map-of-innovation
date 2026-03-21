import React, { useState } from 'react';

import { ATIVACOES_BETT, ATIVACAO_THRESHOLD, AtivacoesPilar } from '../constants';
import { Scores } from '../types';

interface BettAtivacoesProps {
  scores: Scores;
}

const CATEGORY_META = {
  lancamento: {
    label: 'Lançamento',
    helper: 'Produto ou recurso estreando na Bett 2026',
    className: 'border border-[#ff1547] bg-[#fff1f4] text-[#b00f34]',
    order: 0,
  },
  evolucao: {
    label: 'Evolução',
    helper: 'Recurso existente com avanço significativo',
    className: 'border border-[#ffd46a] bg-[#fff8df] text-[#8a5a00]',
    order: 1,
  },
  destaque: {
    label: 'Destaque pedagógico',
    helper: 'Prática com impacto direto na sala de aula',
    className: 'border border-[#bfeef8] bg-[#f2fcff] text-[#086f83]',
    order: 2,
  },
} as const;

function normalizeTag(tag: string) {
  if (tag === 'Expansão' || tag === 'Novidade 2026') return CATEGORY_META.evolucao;
  if (tag === 'Destaque') return CATEGORY_META.destaque;
  return CATEGORY_META.lancamento;
}

function PilarCard({ data }: { data: AtivacoesPilar }) {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="rounded-2xl border-2 overflow-hidden transition-all duration-300 bg-white border-gray-200">
      {/* Header do pilar — sempre visível */}
      <button
        onClick={() => setAberto((a) => !a)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50"
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
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-600 font-bold text-lg transition-transform duration-300"
          style={{ transform: aberto ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </div>
      </button>

      {/* Conteúdo expansível */}
      {aberto && (
        <div className="px-5 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
            {data.intro}
          </p>

          <div className="space-y-3">
            {[...data.ativacoes]
              .sort((a, b) => normalizeTag(a.tag).order - normalizeTag(b.tag).order)
              .map((atv, i) => {
                const category = normalizeTag(atv.tag);
                return (
                  <div
                    key={`${atv.titulo}-${i}`}
                    className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap ${category.className}`}
                          >
                            {category.label}
                          </span>
                          <span className="text-[10px] text-gray-400">{category.helper}</span>
                        </div>
                        <h4 className="font-bold text-sm text-[var(--color-geekie-preto)] leading-snug">
                          {atv.titulo}
                        </h4>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{atv.descricao}</p>
                    <div className="flex items-start gap-2 text-sm rounded-lg p-3 bg-gray-50">
                      <span className="flex-shrink-0 font-bold mt-0.5">→</span>
                      <span className="text-gray-700 leading-relaxed">
                        <strong>Como sua escola pode evoluir:</strong> {atv.impacto}
                      </span>
                    </div>
                  </div>
                );
              })}
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
    .map(([chave]) => chave)
    .slice(0, 3);

  if (pilaresComOportunidade.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 no-print">
      <div className="flex items-start gap-3 mb-2">
        <span className="text-[var(--color-geekie-cereja)] text-xl mt-0.5">✦</span>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-bold text-[var(--color-geekie-preto)]">
              Conheça na Bett 2026
            </h2>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#fff5f7] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ff1547] border border-[#ffd0d9]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff1547] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#ff1547]" />
              </span>
              Ao vivo no estande
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Selecionamos até 3 frentes da Bett com maior aderência ao momento atual da sua escola,
            priorizando o que pode apoiar sua evolução pedagógica de forma mais concreta.
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3 mb-6">
        {Object.values(CATEGORY_META).map((category) => (
          <div key={category.label} className={`rounded-2xl p-4 ${category.className}`}>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em]">
              {category.label}
            </div>
            <div className="mt-2 text-xs leading-relaxed opacity-80">{category.helper}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {pilaresComOportunidade.map((chave) => {
          const data = ATIVACOES_BETT[chave];
          if (!data) return null;
          return <PilarCard key={chave} data={data} />;
        })}
      </div>
    </div>
  );
}
