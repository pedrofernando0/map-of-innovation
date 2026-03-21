import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

import { cn } from '../lib/utils';
export { cn };

type ButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> & {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'md' | 'lg';
  children?: React.ReactNode;
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      // Microinteração: hover sobe 2px, tap reduz 3% — desativado se disabled
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
      disabled={disabled}
      className={cn(
        // Removido `enabled:hover:-translate-y-0.5` — controlado pelo Motion
        'inline-flex items-center justify-center rounded-lg font-bold transition-[background-color,border-color,color,box-shadow] duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2 focus-visible:outline-none',
        variant === 'primary' &&
          'bg-[var(--color-brand-primary)] text-[var(--color-text-on-brand)] hover:bg-opacity-90',
        variant === 'secondary' &&
          'border-2 border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] bg-transparent hover:bg-[var(--color-brand-primary)] hover:text-[var(--color-text-on-brand)]',
        variant === 'outline' &&
          'border-2 border-gray-300 text-gray-700 bg-transparent hover:border-gray-400 hover:bg-gray-50',
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
        className="bg-[var(--color-geekie-cereja)] h-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
