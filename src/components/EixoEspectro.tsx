import React from 'react';

interface EixoEspectroProps {
  label: string;
  score: number;
  extremoEsquerdo: string;
  extremoDireito: string;
  cor: string;
  tooltip?: string;
}

export function EixoEspectro({ label, score, extremoEsquerdo, extremoDireito, cor, tooltip }: EixoEspectroProps) {
  const pct = Math.max(2, Math.min(98, score)); // mantém a seta visível nos extremos

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-gray-700">{label}</span>
        <span className="text-lg font-extrabold ml-auto" style={{ color: cor }}>{score}<span className="text-xs text-gray-400 font-normal ml-0.5">/100</span></span>
        {tooltip && (
          <div className="group relative cursor-help text-gray-400 text-xs">
            ⓘ
            <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-3 w-72 z-20 font-normal leading-relaxed shadow-lg">
              {tooltip}
            </div>
          </div>
        )}
      </div>

      {/* Trilha do espectro */}
      <div className="relative h-6">
        {/* Degradê */}
        <div
          className="absolute inset-y-0 left-0 right-0 rounded-full"
          style={{ background: `linear-gradient(to right, #e5e7eb, ${cor})` }}
        />
        {/* Marcador */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
          style={{ left: `${pct}%` }}
        >
          <div
            className="w-4 h-4 rounded-full border-2 border-white shadow-md"
            style={{ backgroundColor: cor }}
          />
        </div>
      </div>

      {/* Rótulos dos extremos */}
      <div className="flex justify-between text-xs text-gray-400 font-medium px-0.5">
        <span>{extremoEsquerdo}</span>
        <span>{extremoDireito}</span>
      </div>

      {/* Seta "sua escola está aqui" */}
      <div className="relative h-4">
        <div
          className="absolute -translate-x-1/2 flex flex-col items-center"
          style={{ left: `${pct}%` }}
        >
          <span className="text-[10px] font-bold whitespace-nowrap" style={{ color: cor }}>
            sua escola está aqui
          </span>
        </div>
      </div>
    </div>
  );
}
