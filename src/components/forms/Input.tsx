import React from 'react';
import { Warning } from '@phosphor-icons/react';

import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

// UI-4.4: mensagens com role="alert" (anuncia imediatamente ao screen reader),
// ícone Warning weight="fill" (estado de erro ativo), tom positivo.
const ERROR_MESSAGES: Record<string, string> = {
  Obrigatório: 'Este campo é necessário para continuar',
  'E-mail inválido': 'Insira um e-mail válido para continuar',
};

function humanizeError(msg: string): string {
  return ERROR_MESSAGES[msg] ?? msg;
}

export function Input({ label, error, className, id, name, ...props }: InputProps) {
  const inputId = id ?? (name ? `input-${name}` : undefined);
  const errorId = error && inputId ? `${inputId}-error` : undefined;
  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-bold text-gray-700 mb-2">
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        aria-describedby={errorId}
        aria-invalid={Boolean(error)}
        className={cn(
          'w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-geekie-cereja)] focus:border-transparent focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none transition-all',
          error && 'border-red-400 focus:ring-red-400',
          className
        )}
        {...props}
      />
      {error && (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-[var(--color-feedback-error)] text-sm mt-1.5"
        >
          <Warning size={14} weight="fill" aria-hidden="true" />
          {humanizeError(error)}
        </p>
      )}
    </div>
  );
}
