import React from 'react';
import { Warning } from '@phosphor-icons/react';

import { cn } from '../../lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: React.ReactNode;
}

// UI-4.4: mesmas regras do Input.tsx — role="alert", Warning fill, tom positivo
const ERROR_MESSAGES: Record<string, string> = {
  Obrigatório: 'Este campo é necessário para continuar',
};

function humanizeError(msg: string): string {
  return ERROR_MESSAGES[msg] ?? msg;
}

export function Select({ label, error, className, children, id, name, ...props }: SelectProps) {
  const selectId = id ?? (name ? `select-${name}` : undefined);
  const errorId = error && selectId ? `${selectId}-error` : undefined;
  return (
    <div>
      <label htmlFor={selectId} className="block text-sm font-bold text-gray-700 mb-2">
        {label}
      </label>
      <select
        id={selectId}
        name={name}
        aria-describedby={errorId}
        aria-invalid={Boolean(error)}
        className={cn(
          'w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-geekie-cereja)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none bg-white',
          error && 'border-red-400',
          className
        )}
        {...props}
      >
        {children}
      </select>
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
