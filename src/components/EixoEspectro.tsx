import React from 'react';

interface EixoEspectroProps {
  label: string;
  score?: number; // undefined = sem pontuação (eixos secundários no modo hierárquico)
  extremoEsquerdo: string;
  extremoDireito: string;
  cor: string;
  tooltip?: string;
  isMain?: boolean; // eixo geral — destaque visual
}

export function EixoEspectro({ label, score, extremoEsquerdo, extremoDireito, cor, tooltip, isMain = false }: EixoEspectroProps) {
  const pct = score !== undefined ? Math.max(3, Math.min(97, score)) : 50;

  return (
    <div className={`space-y-3 ${isMain ? '' : 'pl-4 border-l-2'}`} style={isMain ? {} : { borderColor: cor + '40' }}>
      {/* Header */}
      <div className="flex items-center gap-2">
        {!isMain && <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">↳</span>}
        <span className={`font-bold ${isMain ? 'text-base text-gray-800' : 'text-sm text-gray-600'}`}>{label}</span>
        {isMain && score !== undefined && (
          <span className="ml-2 text-2xl font-extrabold" style={{ color: cor }}>
            {score}<span className="text-sm text-gray-400 font-normal ml-0.5">/100</span>
          </span>
        )}
        {!isMain && (
          <span className="ml-auto text-sm font-bold text-gray-400">
            {score !== undefined ? `${score}/100` : ''}
          </span>
        )}
        {tooltip && (
          <div className="group relative cursor-help text-gray-400 text-xs ml-1">
            ⓘ
            <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded-lg p-3 w-72 z-20 font-normal leading-relaxed shadow-xl">
              {tooltip}
            </div>
          </div>
        )}
      </div>

      {/* Trilha do espectro */}
      <div className="relative" style={{ height: isMain ? '28px' : '20px' }}>
        {/* Degradê */}
        <div
          className="absolute inset-y-0 left-0 right-0 rounded-full"
          style={{ background: `linear-gradient(to right, #e5e7eb 0%, ${cor}55 50%, ${cor} 100%)` }}
        />

        {/* Marcador */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
          style={{ left: `${pct}%` }}
        >
          {/* Seta acima */}
          <div className="flex flex-col items-center" style={{ marginTop: isMain ? '-38px' : '-28px' }}>
            <span
              className="whitespace-nowrap font-extrabold rounded-full px-2 py-0.5 shadow-sm border"
              style={{
                color: cor,
                backgroundColor: cor + '15',
                borderColor: cor + '40',
                fontSize: isMain ? '11px' : '10px',
              }}
            >
              sua escola está aqui
            </span>
            {/* Linha conectora */}
            <div className="w-px bg-current opacity-40" style={{ height: isMain ? '10px' : '8px', backgroundColor: cor }} />
          </div>

          {/* Bolinha */}
          <div
            className="rounded-full border-2 border-white shadow-lg"
            style={{
              width: isMain ? '20px' : '14px',
              height: isMain ? '20px' : '14px',
              backgroundColor: cor,
              marginLeft: isMain ? '-10px' : '-7px',
            }}
          />
        </div>
      </div>

      {/* Rótulos dos extremos */}
      <div className="flex justify-between px-0.5" style={{ marginTop: isMain ? '6px' : '4px' }}>
        <span className={`text-gray-400 font-medium ${isMain ? 'text-xs' : 'text-[10px]'}`}>{extremoEsquerdo}</span>
        <span className={`text-gray-400 font-medium ${isMain ? 'text-xs' : 'text-[10px]'}`}>{extremoDireito}</span>
      </div>
    </div>
  );
}
