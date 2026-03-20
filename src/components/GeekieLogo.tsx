import React from 'react';
import { cn } from '../lib/utils';

interface GeekieLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: 'color' | 'white';
}

export function GeekieLogo({ className, variant = 'color', alt = 'Geekie Educação', ...props }: GeekieLogoProps) {
  // geekie.png = logo vermelho/colorido (para fundos brancos/claros)
  // geekie-logo.png + invert = logo branco (para fundos vermelhos)
  const isWhite = variant === 'white';
  const src = isWhite ? '/geekie-logo.png' : '/geekie.png';

  return (
    <img
      src={src}
      alt={alt}
      className={cn('block w-auto shrink-0 select-none', isWhite && 'brightness-0 invert', className)}
      decoding="async"
      draggable={false}
      {...props}
    />
  );
}
