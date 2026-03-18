import React from 'react';
import { cn } from '../lib/utils';

interface CategoryIndicatorProps {
  score: number;
  className?: string;
}

const categories = [
  { 
    name: 'Essencial', 
    range: '0 - 40', 
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    description: 'A escola possui condições mínimas. Práticas inovadoras são pontuais e a infraestrutura tecnológica é básica ou subutilizada.'
  },
  { 
    name: 'Explorador', 
    range: '41 - 70', 
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Processos em construção com orientação parcial. Práticas inovadoras ocorrem, mas a integração ainda não é sistêmica.'
  },
  { 
    name: 'Integrada', 
    range: '71 - 100', 
    color: 'bg-green-100 text-green-800 border-green-200',
    description: 'Cultura de inovação consolidada. Práticas ativas e tecnologia estão integradas ao currículo, formação e gestão.'
  },
];

export function CategoryIndicator({ score, className }: CategoryIndicatorProps) {
  const activeIndex = score >= 71 ? 2 : score >= 41 ? 1 : 0;

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex gap-2">
        {categories.map((cat, index) => (
          <div 
            key={cat.name}
            className={cn(
              "flex-1 p-4 rounded-xl border-2 transition-all duration-500",
              index === activeIndex ? cat.color : "bg-gray-50 border-gray-100 opacity-50"
            )}
          >
            <div className="font-bold text-lg">{cat.name}</div>
            <div className="text-xs font-medium opacity-80">{cat.range} pontos</div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-600 border border-gray-100">
        <strong className="text-gray-900">{categories[activeIndex].name}:</strong> {categories[activeIndex].description}
      </div>
    </div>
  );
}
