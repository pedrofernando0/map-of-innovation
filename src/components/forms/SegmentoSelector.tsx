import React from 'react';

import { cn } from '../../lib/utils';

const SEGMENTOS = [
  { id: 'EI', label: 'Educação Infantil' },
  { id: 'EF1', label: 'Ensino Fundamental I' },
  { id: 'EF2', label: 'Ensino Fundamental II' },
  { id: 'EM', label: 'Ensino Médio' },
];

interface SegmentoSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

export function SegmentoSelector({ value, onChange, error }: SegmentoSelectorProps) {
  const toggle = (id: string) => {
    onChange(value.includes(id) ? value.filter((s) => s !== id) : [...value, id]);
  };

  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-3">Segmentos Oferecidos *</label>
      <div className="flex flex-wrap gap-3">
        {SEGMENTOS.map((seg) => (
          <button
            key={seg.id}
            type="button"
            onClick={() => toggle(seg.id)}
            className={cn(
              'px-4 py-2 rounded-full border text-sm font-bold transition-colors',
              value.includes(seg.id)
                ? 'bg-[var(--color-geekie-cereja)] border-[var(--color-geekie-cereja)] text-white'
                : 'border-gray-300 text-gray-600 hover:border-[var(--color-geekie-cereja)]'
            )}
          >
            {seg.label}
          </button>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
