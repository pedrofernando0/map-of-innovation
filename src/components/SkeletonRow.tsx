import React from 'react';

/**
 * Linha de tabela com efeito shimmer para estado de carregamento.
 * Usa CSS keyframes (não Motion) — mais performático para animações repetitivas.
 * Pronto para quando o Admin migrar de localStorage para API assíncrona.
 */
export function SkeletonRow() {
  return (
    <tr aria-hidden="true">
      {[1, 2, 3, 4, 5, 6, 7].map((col) => (
        <td key={col} className="p-4 border-b border-gray-100">
          <div
            className="h-4 rounded-md skeleton-shimmer"
            style={{ width: col === 2 ? '80%' : col === 7 ? '40%' : '60%' }}
          />
        </td>
      ))}
    </tr>
  );
}
