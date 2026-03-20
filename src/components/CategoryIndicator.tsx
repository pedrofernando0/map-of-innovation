import React from 'react';
import { cn } from '../lib/utils';

interface CategoryIndicatorProps {
  nivel: 'ESSENCIAL' | 'INTEGRADA' | 'EXPLORADOR' | '';
  score: number;
  className?: string;
}

const categories = [
  {
    key: 'ESSENCIAL',
    name: 'Essencial',
    range: '0 – 40',
    cue: 'Estruturacao inicial',
    color: 'border-amber-200 bg-amber-50 text-amber-900',
    accent: 'bg-amber-500',
    description: 'A escola apresenta bases importantes, mas a inovacao ainda aparece de forma pontual e depende de maior estruturacao institucional.'
  },
  {
    key: 'EXPLORADOR',
    name: 'Explorador',
    range: '41 – 70',
    cue: 'Integracao em desenvolvimento',
    color: 'border-sky-200 bg-sky-50 text-sky-900',
    accent: 'bg-sky-500',
    description: 'A escola ja movimenta praticas consistentes de inovacao, mas ainda convive com etapas que precisam ganhar continuidade e maior integracao.'
  },
  {
    key: 'INTEGRADA',
    name: 'Integrada',
    range: '71 – 100',
    cue: 'Cultura consolidada',
    color: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    accent: 'bg-emerald-500',
    description: 'A inovacao aparece de forma institucionalizada, com articulacao entre curriculo, decisoes pedagogicas e acompanhamento continuo da aprendizagem.'
  },
];

export function CategoryIndicator({ nivel, score, className }: CategoryIndicatorProps) {
  const activeIndex = categories.findIndex((category) => category.key === nivel);
  const fallbackIndex = score >= 71 ? 2 : score >= 41 ? 1 : 0;
  const resolvedIndex = activeIndex >= 0 ? activeIndex : fallbackIndex;
  const activeCategory = categories[resolvedIndex];

  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid gap-3 md:grid-cols-3">
        {categories.map((cat, index) => (
          <div 
            key={cat.name}
            className={cn(
              'rounded-2xl border p-4 transition-all duration-300 ease-out',
              index === resolvedIndex
                ? `${cat.color} shadow-[0_20px_45px_-32px_rgba(28,28,28,0.45)]`
                : 'border-gray-200 bg-white text-gray-500'
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-bold text-lg">{cat.name}</div>
                <div className="text-xs font-semibold uppercase tracking-[0.14em] opacity-75">{cat.cue}</div>
              </div>
              <span className={cn('mt-1 h-3 w-3 shrink-0 rounded-full', index === resolvedIndex ? cat.accent : 'bg-gray-200')} />
            </div>
            <div className="mt-4 text-xs font-medium opacity-80">{cat.range} pontos</div>
            {index === resolvedIndex && (
              <div className="mt-3 inline-flex rounded-full bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]">
                Perfil atual
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-600 leading-relaxed">
        <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400">Leitura do perfil</div>
        <p>
          <strong className="text-gray-900">{activeCategory.name}:</strong> {activeCategory.description}
        </p>
        <p className="mt-3 text-xs font-medium text-gray-500">Score geral medido: {score}/100</p>
      </div>
    </div>
  );
}
