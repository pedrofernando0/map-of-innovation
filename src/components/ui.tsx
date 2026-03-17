import React from 'react';
import { cn } from '../lib/utils';
export { cn };

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'md' | 'lg';
}

export function Button({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'primary' && 'bg-[var(--color-geekie-cereja)] text-white hover:bg-opacity-90',
        variant === 'secondary' && 'border-2 border-[var(--color-geekie-cereja)] text-[var(--color-geekie-cereja)] bg-transparent hover:bg-[var(--color-geekie-cereja)] hover:text-white',
        variant === 'outline' && 'border-2 border-gray-300 text-gray-700 bg-transparent hover:border-gray-400 hover:bg-gray-50',
        size === 'md' && 'px-6 py-3 text-base',
        size === 'lg' && 'px-8 py-4 text-lg',
        className
      )}
      {...props}
    />
  );
}

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  nivel: 'ESSENCIAL' | 'INTEGRADA' | 'EXPLORADOR' | '';
}

export function Badge({ nivel, className, ...props }: BadgeProps) {
  if (!nivel) return null;
  
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center px-4 py-1.5 rounded-full font-heading font-bold text-xs uppercase tracking-wider',
        nivel === 'ESSENCIAL' && 'bg-[var(--color-geekie-amarelo)] text-[#7a5c00]',
        nivel === 'INTEGRADA' && 'bg-[var(--color-geekie-azul)] text-[#004d5c]',
        nivel === 'EXPLORADOR' && 'bg-[var(--color-geekie-verde)] text-[#0d4a30]',
        className
      )}
      {...props}
    >
      {nivel}
    </div>
  );
}

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-[#f0f0f0] h-1 rounded-full overflow-hidden">
      <div 
        className="bg-[var(--color-geekie-cereja)] h-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
