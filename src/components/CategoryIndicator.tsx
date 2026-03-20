import React from 'react';
import { cn } from '../lib/utils';

interface CategoryIndicatorProps {
  score: number;
  className?: string;
}

const categories = [
  {
    name: 'Essencial',
    range: '0 – 40',
    color: 'bg-amber-50 text-amber-800 border-amber-200',
    description: 'Minha escola possui condições básicas de funcionamento. Práticas inovadoras existem de forma pontual ou dependem de iniciativas individuais, sem respaldo institucional. O uso de tecnologia é limitado ou subutilizado. Há espaço significativo para estruturação e intencionalidade pedagógica.'
  },
  {
    name: 'Explorador',
    range: '41 – 70',
    color: 'bg-sky-50 text-sky-800 border-sky-200',
    description: 'Minha escola demonstra processos em construção, com orientação institucional parcial. Existem práticas inovadoras e uso de tecnologia em diferentes contextos, mas a integração ainda não é sistêmica. Práticas tradicionais e inovadoras coexistem — o que é característico deste estágio de transformação.'
  },
  {
    name: 'Integrada',
    range: '71 – 100',
    color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    description: 'Minha escola demonstra cultura institucional consolidada de inovação. Práticas pedagógicas ativas e uso intencional de tecnologia estão integrados ao currículo, à formação docente e à gestão. Existem ciclos contínuos de avaliação e melhoria que sustentam a inovação ao longo do tempo.'
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
