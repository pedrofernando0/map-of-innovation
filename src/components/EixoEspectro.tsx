import React from 'react';

interface EixoEspectroProps {
  label: string;
  score: number;
  extremoEsquerdo: string;
  extremoDireito: string;
  cor: string;
  tooltip?: string;
  isMain?: boolean;
}

export function EixoEspectro({ label, score, extremoEsquerdo, extremoDireito, cor, tooltip, isMain = false }: EixoEspectroProps) {
  // Garante que o marcador fique visível e dentro da trilha
  const pct = Math.max(4, Math.min(96, score));

  const trackH = isMain ? 32 : 22;
  const dotSize = isMain ? 24 : 16;
  const badgeFontSize = isMain ? '12px' : '11px';

  return (
    <div className={isMain ? '' : 'pl-5 border-l-2'} style={isMain ? {} : { borderColor: cor + '50' }}>
      {/* Cabeçalho */}
      <div className="flex items-center gap-2 mb-3">
        {!isMain && (
          <span className="text-xs font-bold" style={{ color: cor + 'aa' }}>↳</span>
        )}
        <span className={`font-bold ${isMain ? 'text-base text-[var(--color-geekie-preto)]' : 'text-sm text-gray-600'}`}>
          {label}
        </span>
        {isMain && (
          <span className="ml-2 text-3xl font-extrabold" style={{ color: cor }}>
            {score}
            <span className="text-base font-normal text-gray-400 ml-0.5">/100</span>
          </span>
        )}
        {tooltip && (
          <div className="group relative cursor-help ml-1">
            <span className="text-gray-400 text-sm">ⓘ</span>
            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded-xl p-4 w-80 z-30 leading-relaxed shadow-2xl">
              {tooltip}
            </div>
          </div>
        )}
      </div>

      {/* Badge "sua escola está aqui" + linha + trilha + bolinha — tudo num container */}
      <div className="relative" style={{ paddingTop: isMain ? '36px' : '28px' }}>

        {/* Badge flutuante */}
        <div
          className="absolute"
          style={{ left: `${pct}%`, top: 0, transform: 'translateX(-50%)' }}
        >
          <div className="flex flex-col items-center">
            <span
              className="whitespace-nowrap font-bold rounded-full border shadow-sm px-3 py-1"
              style={{
                fontSize: badgeFontSize,
                color: '#fff',
                backgroundColor: cor,
                borderColor: cor,
              }}
            >
              sua escola está aqui
            </span>
            {/* Linha conectora */}
            <div style={{ width: '2px', height: isMain ? '12px' : '8px', backgroundColor: cor, opacity: 0.6 }} />
          </div>
        </div>

        {/* Trilha */}
        <div
          className="relative rounded-full overflow-hidden"
          style={{ height: `${trackH}px`, background: `linear-gradient(to right, #e5e7eb 0%, ${cor}60 40%, ${cor} 100%)` }}
        >
          {/* Bolinha — absolutamente centrada verticalmente dentro da trilha */}
          <div
            className="absolute top-1/2 border-[3px] border-white shadow-lg rounded-full"
            style={{
              width: `${dotSize}px`,
              height: `${dotSize}px`,
              left: `${pct}%`,
              transform: 'translateX(-50%) translateY(-50%)',
              backgroundColor: cor,
            }}
          />
        </div>

        {/* Rótulos extremos */}
        <div className="flex justify-between mt-2 px-0.5">
          <span className={`text-gray-400 font-medium ${isMain ? 'text-xs' : 'text-xs'}`}>{extremoEsquerdo}</span>
          <span className={`text-gray-400 font-medium ${isMain ? 'text-xs' : 'text-xs'}`}>{extremoDireito}</span>
        </div>
      </div>
    </div>
  );
}
