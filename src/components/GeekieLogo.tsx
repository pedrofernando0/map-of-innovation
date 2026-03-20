import React from 'react';
import { cn } from '../lib/utils';

interface GeekieLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  inverted?: boolean;
}

export function GeekieLogo({ className, inverted = false, alt = 'Geekie Educacao', ...props }: GeekieLogoProps) {
  const logoSrc = typeof document === 'undefined'
    ? '/geekie-logo.png'
    : new URL('geekie-logo.png', document.baseURI).toString();

  return (
    <img
      src={logoSrc}
      alt={alt}
      className={cn('block w-auto shrink-0 select-none', inverted && 'brightness-0 invert', className)}
      decoding="async"
      draggable={false}
      {...props}
    />
  );
}
