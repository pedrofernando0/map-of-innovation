import React from 'react';

import { cn } from '../../lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export function Select({ label, error, className, children, id, name, ...props }: SelectProps) {
  const selectId = id ?? (name ? `select-${name}` : undefined);
  return (
    <div>
      <label htmlFor={selectId} className="block text-sm font-bold text-gray-700 mb-2">
        {label}
      </label>
      <select
        id={selectId}
        name={name}
        className={cn(
          'w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[var(--color-geekie-cereja)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none bg-white',
          error && 'border-red-400',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
